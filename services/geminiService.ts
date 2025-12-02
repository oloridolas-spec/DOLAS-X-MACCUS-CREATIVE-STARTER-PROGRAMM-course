import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { COURSES, BANK_DETAILS } from '../constants';

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are the Program Assistant for the "Dolas x Maccus Creative Starter Program".
Your tone is helpful, energetic, and slightly "techy" / cool.

Key Information to know:
1. Founders: Dolas Danley (Design/3D) and Maccus (Video/Motion).
2. Courses Offered: 
   - 3D Animation & Modeling (Blender).
   - Pro Video Editing.
   - Motion Design & VFX.
3. Pricing & Offers: 
   - **Early Bird Price:** ₦1,500 (Strictly for the first 15 people).
   - **Real Price:** ₦2,500.
4. Dates: Program runs from Dec 15th to Dec 23rd, 2024.
5. Payment: Bank transfer to ${BANK_DETAILS.bankName}, ${BANK_DETAILS.accountNumber}, ${BANK_DETAILS.accountName}.
6. Goals: Help beginners master high-income digital skills.

If a user asks how to enroll, guide them to click the "Enroll" button on the course cards.
Emphasize the "First 15 People" rule if they ask about the discount to create urgency.
Keep answers concise (under 50 words unless detail is requested).
`;

export const getChatResponse = async (userMessage: string): Promise<string> => {
  if (!API_KEY) {
    return "I'm currently offline (API Key missing). Please contact support manually.";
  }

  try {
    if (!chatSession) {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    }

    const response: GenerateContentResponse = await chatSession.sendMessage({
        message: userMessage
    });
    
    return response.text || "I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "System glitch. Please try again later.";
  }
};