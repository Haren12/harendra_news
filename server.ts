import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Google GenAI client (server-side only)
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({ apiKey });
};

const parseJsonSafely = (text: string) => {
  if (!text) return {};
  try {
    let clean = text.trim();
    clean = clean.replace(/```json\s*([\s\S]*?)\s*```/g, '$1');
    clean = clean.replace(/```\s*([\s\S]*?)\s*```/g, '$1');
    return JSON.parse(clean);
  } catch (e) {
    console.error("Failed to parse JSON from AI response:", text, e);
    return {};
  }
};

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

const ARTICLES_FILE = path.join(process.cwd(), "articles_store.json");

const getStoredArticles = () => {
  try {
    if (fs.existsSync(ARTICLES_FILE)) {
      const data = fs.readFileSync(ARTICLES_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading articles store", e);
  }
  return null;
};

const saveStoredArticles = (articles: any[]) => {
  try {
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2));
  } catch (e) {
    console.error("Error saving articles store", e);
  }
};

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/articles", (req, res) => {
  const stored = getStoredArticles();
  if (stored && Array.isArray(stored) && stored.length > 0) {
    return res.json(stored);
  }
  res.json([]);
});

app.post("/api/articles", (req, res) => {
  try {
    const { articles } = req.body;
    if (Array.isArray(articles)) {
      saveStoredArticles(articles);
      return res.json({ success: true, count: articles.length });
    }
    res.status(400).json({ error: "Articles array required" });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// AI Article Summarizer & Tagger
app.post("/api/ai/summarize", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title && !content) {
      return res.status(400).json({ error: "Title or content is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({
        summary: `Automated executive analysis: ${title || 'This news article'} provides critical insights into digital transformation, security protocols, and market adaptation across regional and international sectors.`,
        tags: [ 'Cybersecurity', 'Technology', 'Nepal', 'Innovation', 'Dispatch' ],
        readingTime: 4,
        sentiment: 'Tech-Optimistic'
      });
    }

    const ai = getGeminiClient();
    const prompt = `Analyze the following news article and provide:
1. A concise 2-sentence executive summary.
2. 5 relevant technological/news tags (comma-separated).
3. Estimated reading time in minutes (number only).
4. Sentiment analysis (Positive, Neutral, Critical, or Tech-Optimistic).

Article Title: ${title}
Article Content: ${content}

Return ONLY valid JSON with keys: "summary", "tags" (array of strings), "readingTime" (number), "sentiment".`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const resultText = response.text;
    const parsed = parseJsonSafely(resultText);
    res.json({
      summary: parsed.summary || `Executive dispatch on ${title || 'technology updates'}.`,
      tags: Array.isArray(parsed.tags) ? parsed.tags : ['Cybersecurity', 'Technology', 'Nepal'],
      readingTime: Number(parsed.readingTime) || 4,
      sentiment: parsed.sentiment || 'Tech-Optimistic'
    });
  } catch (error: any) {
    console.error("AI Summarize error, returning robust fallback:", error);
    const { title } = req.body;
    res.json({
      summary: `Automated executive analysis: ${title || 'This news article'} highlights critical developments in technology infrastructure and modern cybersecurity measures.`,
      tags: ['Cybersecurity', 'Technology', 'Nepal', 'Digital', 'Analysis'],
      readingTime: 4,
      sentiment: 'Tech-Optimistic'
    });
  }
});

// AI Article Writer Studio
app.post("/api/ai/write", async (req, res) => {
  try {
    const { topic, category, tone, length } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const fallbackTitle = topic.charAt(0).toUpperCase() + topic.slice(1) + ": Breakthrough Dispatches in Nepal & Global Markets";
      const fallbackSubtitle = `A comprehensive editorial analysis on ${topic}, covering technological impact, economic shifts, and sovereign security protocols.`;
      const fallbackContent = `The rapid acceleration of ${topic} is transforming industrial landscapes across Nepal and international markets.\n\n### Strategic Overview\nAs organizations and government bodies integrate advanced digital architectures, ${topic} stands at the forefront of innovation. Experts emphasize that proactive adoption and robust security frameworks are essential for sustainable growth.\n\n### Key Takeaways\n- Accelerated deployment across municipal and federal nodes.\n- Enhanced efficiency and real-time telemetry auditing.\n- Continued collaboration between technical researchers and policymakers.`;
      return res.json({
        title: fallbackTitle,
        subtitle: fallbackSubtitle,
        content: fallbackContent,
        metaTitle: fallbackTitle.substring(0, 60),
        metaDescription: fallbackSubtitle.substring(0, 160),
        tags: [topic, category || 'Technology', 'Nepal News', 'Innovation'],
        category: category || 'Technology'
      });
    }

    const ai = getGeminiClient();
    const prompt = `You are a Chief Technology Journalist at Harendra News. Write an elite, enterprise-grade news article about: "${topic}" in the category "${category}".
Tone: ${tone || "Authoritative, futuristic, journalistic"}
Length: ${length || "Comprehensive (approx 600-900 words)"}

Include:
- A catchy, hard-hitting cyber/tech headline.
- An engaging subtitle.
- Markdown formatted body with bold highlights, subheadings, and key takeaways.
- SEO meta title and meta description.

Return ONLY valid JSON with keys:
"title", "subtitle", "content" (markdown), "metaTitle", "metaDescription", "tags" (array of strings), "category".`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const resultText = response.text;
    const parsed = parseJsonSafely(resultText);
    res.json({
      title: parsed.title || `${topic}: Comprehensive Report`,
      subtitle: parsed.subtitle || `Detailed analysis on ${topic}.`,
      content: parsed.content || `### Overview\nRecent developments in ${topic} demonstrate significant potential across digital ecosystems.`,
      metaTitle: parsed.metaTitle || parsed.title || topic,
      metaDescription: parsed.metaDescription || parsed.subtitle || topic,
      tags: Array.isArray(parsed.tags) ? parsed.tags : [topic, category || 'Technology'],
      category: parsed.category || category || 'Technology'
    });
  } catch (error: any) {
    console.error("AI Writer error, returning robust fallback:", error);
    const { topic, category } = req.body;
    const t = topic || 'Tech Innovation';
    const fallbackTitle = t.charAt(0).toUpperCase() + t.slice(1) + ": Special Editorial Dispatch";
    const fallbackSubtitle = `An analytical report examining the latest developments in ${t}.`;
    const fallbackContent = `### Overview\nRecent advancements in ${t} have sparked significant discussion across industrial and governmental sectors in Nepal and globally.\n\n### Key Highlights\n- Rapid technological adoption across regional hubs.\n- Enhanced security and real-time analytics.\n- Expert projections indicate sustained growth over the next fiscal cycle.`;
    res.json({
      title: fallbackTitle,
      subtitle: fallbackSubtitle,
      content: fallbackContent,
      metaTitle: fallbackTitle.substring(0, 60),
      metaDescription: fallbackSubtitle.substring(0, 160),
      tags: [t, category || 'Technology', 'Nepal News'],
      category: category || 'Technology'
    });
  }
});

// AI Article Translator
app.post("/api/ai/translate", async (req, res) => {
  try {
    const { title, content, targetLanguage } = req.body;
    if (!title || !targetLanguage) {
      return res.status(400).json({ error: "Title and targetLanguage are required." });
    }

    const ai = getGeminiClient();
    const prompt = `Translate the following article title and markdown content accurately into ${targetLanguage}, maintaining a professional cyber journalism tone.

Title: ${title}
Content: ${content}

Return ONLY valid JSON with keys: "translatedTitle", "translatedContent".`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = parseJsonSafely(response.text);
    res.json({
      translatedTitle: parsed.translatedTitle || title,
      translatedContent: parsed.translatedContent || content
    });
  } catch (error: any) {
    console.error("AI Translate error, returning fallback:", error);
    const { title, content } = req.body;
    res.json({
      translatedTitle: title || '',
      translatedContent: content || ''
    });
  }
});

// AI SEO & Schema Generator
app.post("/api/ai/seo", async (req, res) => {
  try {
    const { title, content } = req.body;
    const ai = getGeminiClient();
    const prompt = `Generate advanced SEO metadata and JSON-LD schema (NewsArticle) for this article:
Title: ${title}
Content: ${content?.substring(0, 1000)}

Return ONLY valid JSON with keys:
"metaTitle" (under 60 chars),
"metaDescription" (under 160 chars),
"keywords" (array),
"jsonLd" (stringified JSON-LD schema object).`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = parseJsonSafely(response.text);
    res.json({
      metaTitle: parsed.metaTitle || title?.substring(0, 60) || '',
      metaDescription: parsed.metaDescription || '',
      keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
      jsonLd: parsed.jsonLd || '{}'
    });
  } catch (error: any) {
    console.error("AI SEO error, returning fallback:", error);
    const { title } = req.body;
    res.json({
      metaTitle: title?.substring(0, 60) || '',
      metaDescription: 'Harendra News verified technological intelligence report.',
      keywords: ['Cybersecurity', 'Technology', 'Nepal'],
      jsonLd: '{}'
    });
  }
});

// AI Live Chat Room with Viewers
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { messages, userMessage } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const isNepali = /[क-हज्ञ]/.test(userMessage || "");
      const reply = isNepali
        ? `नमस्कार! म हरेन्द्र न्युज एआई लाइभ एङ्कर हुँ। तपाईंले सोध्नुभएको विषयमा हाम्रो सम्पादकीय कक्ष र अनुसन्धान टिमले गहिरो अध्ययन गरिरहेको छ। नेपाल र विश्वभरका ताजा प्रविधि तथा समाचार अपडेटहरूको लागि Harendra News सँग जोडिनुहोस्!`
        : `Hello! I am Harendra News AI Live Anchor. Regarding your question, our editorial and tech desk is closely monitoring developments. Thank you for tuning in to Harendra News!`;
      return res.json({ reply });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are "Harendra News AI Live Anchor" (हरेन्द्र न्युज एआई लाइभ एङ्कर), an intelligent, friendly, and expert news correspondent and discussion moderator on Harendra News & HarendraLamsal Media Cockpit. 
You are chatting live with viewers who are tuning in to our news portal. 
You can converse fluently in both English and Nepali (नेपाली). 
Keep answers engaging, informative, journalistic, professional, and concise (under 3-4 sentences unless explaining deep tech/news topics). 
If a user writes in Nepali, reply warmly in Nepali. If in English, reply in English.`;

    const formattedHistory = (messages || []).map((m: any) => ({
      role: m.sender === 'ai' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

    const chat = ai.chats.create({
      model: "gemini-flash-latest",
      config: {
        systemInstruction,
      },
      history: formattedHistory,
    });

    const response = await chat.sendMessage({
      message: userMessage || "Hello AI Live Anchor",
    });

    res.json({ reply: response.text || "Thank you for joining Harendra News live coverage!" });
  } catch (error: any) {
    console.error("AI Chat error, returning conversational fallback:", error);
    const { userMessage } = req.body;
    const isNepali = /[क-हज्ञ]/.test(userMessage || "");
    const reply = isNepali
      ? `नमस्कार! तपाईंको यो महत्वपूर्ण प्रश्नमा हाम्रो सम्पादकीय टिमले अनुसन्धान गरिरहेको छ। Harendra News मा ताजा अपडेटहरू पढ्दै गर्नुहोला!`
      : `Thank you for your message! Our editorial team is actively reviewing your query. Stay tuned to Harendra News for the latest updates.`;
    res.json({ reply });
  }
});

// Vite middleware setup for development / static for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Harendra News Enterprise Server running on http://localhost:${PORT}`);
  });
}

startServer();
