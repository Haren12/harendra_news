import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI client (server-side only)
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({ apiKey });
};

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Article Summarizer & Tagger
app.post("/api/ai/summarize", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title && !content) {
      return res.status(400).json({ error: "Title or content is required." });
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
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const resultText = response.text;
    const parsed = JSON.parse(resultText || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("AI Summarize error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI summary." });
  }
});

// AI Article Writer Studio
app.post("/api/ai/write", async (req, res) => {
  try {
    const { topic, category, tone, length } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required." });
    }

    const ai = getGeminiClient();
    const prompt = `You are a Chief Cyber-Technology Journalist at CyberNews AI. Write an elite, enterprise-grade news article about: "${topic}" in the category "${category}".
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
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const resultText = response.text;
    const parsed = JSON.parse(resultText || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("AI Writer error:", error);
    res.status(500).json({ error: error.message || "Failed to generate article." });
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
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("AI Translate error:", error);
    res.status(500).json({ error: error.message || "Translation failed." });
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
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("AI SEO error:", error);
    res.status(500).json({ error: error.message || "SEO generation failed." });
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
    console.log(`CyberNews AI Enterprise Server running on http://localhost:${PORT}`);
  });
}

startServer();
