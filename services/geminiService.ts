import { GoogleGenAI, Chat } from "@google/genai";
import { User } from "../types";
import { USERS } from "../constants";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateUserBio = async (user: User): Promise<string> => {
  try {
    const ai = getClient();
    const prompt = `Write a professional, concise (max 3 sentences), and inspiring bio for a team member named ${user.name} who is a ${user.role}. Highlight their potential impact on a tech project.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Bio generation unavailable.";
  } catch (error) {
    console.error("Error generating bio:", error);
    return "Could not generate bio at this time. Please check API key configuration.";
  }
};

export const createChatSession = async (): Promise<Chat> => {
  const ai = getClient();
  
  // Create a context string from the USERS constant
  const teamContext = USERS.map(u => 
    `- ${u.name}: ${u.role}`
  ).join('\n');

  const systemInstruction = `You are a helpful and knowledgeable assistant for the "Team Nexus" dashboard.
  
  Here is the list of team members and their roles:
  ${teamContext}

  Your goal is to answer questions about the team members, their roles, or general questions about the dashboard.
  
  Guidelines:
  1. Be professional, friendly, and concise.
  2. If asked about a specific person, use the provided list to identify their role.
  3. If asked about what a specific role does (e.g., "What does the System Admin do?"), provide a general professional description of that role in a tech context, as the specific descriptions might be empty.
  4. Do not make up facts about the people other than their name and role provided.
  5. If the user asks for something unrelated to the team or tech, politely steer them back to the team context.`;

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });
};