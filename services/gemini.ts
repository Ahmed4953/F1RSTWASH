
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getServiceRecommendation = async (carType: string, condition: string, lastWash: string, lang: 'de' | 'en' = 'de') => {
  const model = "gemini-3-flash-preview";
  
  const prompt = lang === 'de' ? `
    Du bist ein Experte für Premium-Autoaufbereitung bei F1RST-WASH in Berlin. 
    Ein Kunde fragt nach einer Empfehlung.
    Fahrzeugtyp: ${carType}
    Zustand: ${condition}
    Letzte Reinigung: ${lastWash}
    
    Biete eine kurze, professionelle und überzeugende Empfehlung an, welches Paket am besten passt:
    - Außenwäsche (49€)
    - Innenreinigung (69€)
    - Kombi-Paket (ab 100€)
    - Premium Detailing (Individuell)
    
    Antworte kurz auf DEUTSCH, max 3 Sätze. Sei exklusiv und höflich.
  ` : `
    You are an expert for premium car detailing at F1RST-WASH in Berlin. 
    A customer is asking for a recommendation.
    Vehicle type: ${carType}
    Condition: ${condition}
    Last cleaning: ${lastWash}
    
    Offer a short, professional, and convincing recommendation on which package fits best:
    - Exterior Wash (from 49€)
    - Interior Cleaning (from 69€)
    - Combo Package (from 100€)
    - Premium Detailing (Individual)
    
    Respond briefly in ENGLISH, max 3 sentences. Be exclusive and polite.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return lang === 'de' 
      ? "Wir empfehlen unser beliebtes Kombi-Paket für eine Rundum-Erneuerung Ihres Fahrzeugs. Besuchen Sie uns in der Mall of Berlin!" 
      : "We recommend our popular Combo Package for a complete renewal of your vehicle. Visit us at the Mall of Berlin!";
  }
};
