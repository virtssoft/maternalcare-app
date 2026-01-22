
import { GoogleGenAI, Type } from "@google/genai";

// Always use the direct process.env.API_KEY for initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPregnancyTips = async (week: number) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Génère 3 conseils courts et bienveillants pour une femme enceinte à sa ${week}ème semaine de grossesse.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              tip: { type: Type.STRING },
              category: { type: Type.STRING }
            },
            required: ['tip', 'category']
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Error:", error);
    return [
      { tip: "Reposez-vous régulièrement.", category: "Bien-être" },
      { tip: "Hydratez-vous bien tout au long de la journée.", category: "Nutrition" }
    ];
  }
};

export const getProviderDashboardSummary = async (patientCount: number, alerts: number) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `En tant qu'assistant de santé, résume brièvement l'état de la clinique aujourd'hui : ${patientCount} patientes suivies et ${alerts} alertes urgentes. Donne un encouragement court pour le personnel de santé.`,
        });
        return response.text;
    } catch (error) {
        return "Bonne journée de travail ! Restez vigilants sur les alertes critiques.";
    }
};

export const analyzeSymptoms = async (symptoms: string[], week: number) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Une femme enceinte à la semaine ${week} ressent les symptômes suivants : ${symptoms.join(', ')}. 
      Fournis une analyse rassurante mais prudente. 
      Indique si c'est normal ou si elle doit consulter. 
      Réponds en 2-3 phrases maximum.`,
    });
    return response.text;
  } catch (error) {
    return "Il est toujours préférable de noter ces symptômes et d'en parler à votre sage-femme lors de votre prochaine visite. Si la douleur est vive, consultez immédiatement.";
  }
};

export const getClinicalInsight = async (patientData: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyse les données suivantes pour un prestataire de santé : 
      Patiente : ${patientData.name}, Semaine : ${patientData.week}, Tension : ${patientData.bp}, Risque : ${patientData.risk}. 
      Génère une note clinique concise (2 phrases) soulignant les points de vigilance prioritaires.`,
    });
    return response.text;
  } catch (error) {
    return "Surveillance standard recommandée. Vérifier la tension artérielle au prochain rendez-vous.";
  }
};
