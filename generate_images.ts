import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateBlogImages() {
  const prompts = [
    { id: 'vision', prompt: "A futuristic esport arena with holographic displays, neon lights, and a sense of grand vision and community, cinematic lighting, 16:9" },
    { id: 'caster', prompt: "A professional esport caster with a high-end microphone and headset, intense expression, blurred background of a gaming tournament, cinematic lighting, 16:9" },
    { id: 'automation', prompt: "A futuristic control room with multiple monitors showing esport tournament brackets and automated workflows, neon blue and purple accents, 16:9" },
    { id: 'guild', prompt: "A diverse group of gamers sitting together in a modern gaming hub, collaborating and laughing, high-tech equipment, warm and community-focused atmosphere, 16:9" },
    { id: 'monetization', prompt: "A close-up of a digital tablet showing esport event sponsorship deals and ticket sales analytics, professional and business-oriented, 16:9" },
    { id: 'design', prompt: "A graphic designer's desk with a large monitor showing a sleek esport team logo and jersey design, creative and modern, 16:9" },
    { id: 'manager', prompt: "An esport team manager in a professional suit, talking to a group of young players in a high-tech training room, leadership and strategy, 16:9" },
    { id: 'tech', prompt: "A person wearing a sleek VR headset, immersed in a futuristic esport metaverse, glowing digital elements, 16:9" },
    { id: 'tools_preview', prompt: "A sleek, dark-themed dashboard interface for esport tournament management, showing brackets, live scores, and player stats, futuristic and high-tech, 4:3" }
  ];

  for (const item of prompts) {
    console.log(`Generating image for: ${item.id}...`);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: item.prompt }],
        },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          console.log(`IMAGE_URL_${item.id.toUpperCase()}: data:image/png;base64,${part.inlineData.data}`);
        }
      }
    } catch (error) {
      console.error(`Error generating image for ${item.id}:`, error);
    }
  }
}

generateBlogImages();
