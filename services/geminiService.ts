import { GoogleGenAI } from "@google/genai";
import { Client, Inquiry, Order } from "../types";

// Initialize Gemini Client
// @ts-ignore
const ai = import.meta.env.VITE_API_KEY ? new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY }) : null;
const modelId = 'gemini-2.5-flash';

export const analyzeInquiryPsychology = async (inquiry: Inquiry, clientHistory?: Client): Promise<string> => {
  if (!ai) return JSON.stringify({ suggested_approach: "Mock AI: key not configured." });
  try {
    const prompt = `
      Act as an expert tailor and sales psychologist. Analyze this inquiry and client history.
      
      Client: ${inquiry.clientName}
      Message: "${inquiry.message}"
      Source: ${inquiry.source}
      History: ${clientHistory ? `Return client with ${clientHistory.totalOrders} past orders. Notes: ${clientHistory.notes}` : "New client."}

      Provide a JSON response with the following keys:
      - decision_style (Quick / Thoughtful / Indecisive)
      - budget_sensitivity (High / Medium / Low)
      - style_preference (Classic / Trendy / Experimental)
      - suggested_approach (A 1-sentence sales tip)
      
      Return ONLY valid JSON.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    return response.text() || "{}";
  } catch (error) {
    console.error("AI Error:", error);
    return JSON.stringify({ error: "Failed to analyze inquiry." });
  }
};

export const suggestJobAdjustments = async (order: Order): Promise<string> => {
  if (!ai) return "Mock AI: No insights available (Key missing).";
  try {
    const prompt = `
      Act as a master tailor. Review this job card for potential risks or suggestions.
      
      Garment: ${order.garmentType}
      Fabric: ${order.fabric}
      Measurements: ${JSON.stringify(order.measurements)}
      Notes: ${order.notes}
      
      Provide 3 brief, bulleted technical suggestions for the tailor regarding fit, needle type, or construction.
      Format as a simple markdown list.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text() || "No insights available.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Unable to generate tailoring insights at this time.";
  }
};

export const generateBusinessInsights = async (orders: Order[], inquiries: Inquiry[]): Promise<string> => {
  if (!ai) return "Mock AI: Business insights unavailable.";
  try {
    const prompt = `
      Analyze these business metrics for a bespoke tailoring shop.
      
      Active Orders: ${orders.length}
      Top Fabric: ${orders[0]?.fabric || 'Wool'}
      Pending Inquiries: ${inquiries.length}
      
      Give a 50-word executive summary for the business owner on what to focus on this week (e.g., ordering stock, following up on leads, or production bottlenecks).
    `;

    const response = await ai.models.generateContent({
        model: modelId,
        contents: prompt
    });
    
    return response.text() || "No insights available.";
  } catch (error) {
     console.error("AI Error:", error);
     return "Unable to generate business insights.";
  }
}
