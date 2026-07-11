// Nepali Unicode Romanized Transliteration Utility & Dictionary

const romanToNepaliMap: Record<string, string> = {
  // Common Words
  'nepal': 'नेपाल',
  'nepali': 'नेपाली',
  'kathmandu': 'काठमाडौं',
  'samachar': 'समाचार',
  'khabar': 'खबर',
  'aajako': 'आजको',
  'mukhya': 'मुख्य',
  'pradhanmantri': 'प्रधानमन्त्री',
  'mantri': 'मन्त्री',
  'sarkar': 'सरकार',
  'desh': 'देश',
  'rashtra': 'राष्ट्र',
  'rastriya': 'राष्ट्रिय',
  'janata': 'जनता',
  'nagraik': 'नागरिक',
  'bichar': 'विचार',
  'bicharharu': 'विचारहरू',
  'patrakar': 'पत्रकार',
  'patrika': 'पत्रिका',
  'dhanyawad': 'धन्यवाद',
  'namaste': 'नमस्ते',
  'swagat': 'स्वागत',
  'harendra': 'हरेन्द्र',
  'lamsal': 'लम्साल',
  'arthantra': 'अर्थतन्त्र',
  'bikas': 'विकास',
  'shikshya': 'शिक्षा',
  'swasthya': 'स्वास्थ्य',
  'khelkud': 'खेलकुद',
  'rajniti': 'राजनीति',
  'bidesh': 'विदेश',
  'pariwar': 'परिवार',
  'samaj': 'समाज',
  'sanskriti': 'संस्कृति',
  'kala': 'कला',
  'sahitya': 'साहित्य',
  'gyan': 'ज्ञान',
  'prabidhi': 'प्रविधि',
  'bijuli': 'बिजुली',
  'sadak': 'सडक',
  'pariodjana': 'आयोजना',
  'nirwachan': 'निर्वाचन',
  'matadan': 'मतदान',
  'vidhyalaya': 'विद्यालय',
  'biswavidyalaya': 'विश्वविद्यालय',
};

export const transliterateToNepali = (input: string): string => {
  if (!input) return '';
  
  const words = input.split(/(\s+)/);
  const translatedWords = words.map(word => {
    const cleanWord = word.toLowerCase().trim();
    if (romanToNepaliMap[cleanWord]) {
      return romanToNepaliMap[cleanWord];
    }
    
    let w = word;
    w = w.replace(/ksha/g, 'क्ष');
    w = w.replace(/tra/g, 'त्र');
    w = w.replace(/gya/g, 'ज्ञ');
    w = w.replace(/shh/g, 'ष');
    w = w.replace(/chha/g, 'छ');
    w = w.replace(/gha/g, 'घ');
    w = w.replace(/jha/g, 'झ');
    w = w.replace(/dha/g, 'ध');
    w = w.replace(/pha/g, 'फ');
    w = w.replace(/bha/g, 'भ');
    w = w.replace(/kha/g, 'ख');
    w = w.replace(/tha/g, 'थ');
    w = w.replace(/ch/g, 'च');
    w = w.replace(/sh/g, 'श');
    w = w.replace(/ng/g, 'ङ');
    w = w.replace(/ny/g, 'ञ');

    w = w.replace(/ka/g, 'क');
    w = w.replace(/ga/g, 'ग');
    w = w.replace(/ja/g, 'ज');
    w = w.replace(/ta/g, 'त');
    w = w.replace(/da/g, 'द');
    w = w.replace(/na/g, 'न');
    w = w.replace(/pa/g, 'प');
    w = w.replace(/ba/g, 'ब');
    w = w.replace(/ma/g, 'म');
    w = w.replace(/ya/g, 'य');
    w = w.replace(/ra/g, 'र');
    w = w.replace(/la/g, 'ल');
    w = w.replace(/wa/g, 'व');
    w = w.replace(/va/g, 'व');
    w = w.replace(/sa/g, 'स');
    w = w.replace(/ha/g, 'ह');

    w = w.replace(/aa/g, 'आ');
    w = w.replace(/ii/g, 'ई');
    w = w.replace(/uu/g, 'ऊ');
    w = w.replace(/ai/g, 'ऐ');
    w = w.replace(/au/g, 'औ');
    w = w.replace(/\ba\b/g, 'अ');
    w = w.replace(/\bi\b/g, 'इ');
    w = w.replace(/\bu\b/g, 'उ');
    w = w.replace(/\be\b/g, 'ए');
    w = w.replace(/\bo\b/g, 'ओ');

    w = w.replace(/0/g, '०');
    w = w.replace(/1/g, '१');
    w = w.replace(/2/g, '२');
    w = w.replace(/3/g, '३');
    w = w.replace(/4/g, '४');
    w = w.replace(/5/g, '५');
    w = w.replace(/6/g, '६');
    w = w.replace(/7/g, '७');
    w = w.replace(/8/g, '८');
    w = w.replace(/9/g, '९');

    return w;
  });

  return translatedWords.join('');
};
