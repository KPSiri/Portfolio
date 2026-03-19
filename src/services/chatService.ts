import { GoogleGenAI } from "@google/genai";

const RESUME_CONTEXT = `
Name: Karanam Poorna Siri
Role: AI Engineer & MSc Artificial Intelligence Student at University of Edinburgh
Education:
- MSc Artificial Intelligence, University of Edinburgh (Current)
- B.Tech Artificial Intelligence and Data Science, Sri Sairam Engineering College (9.39 CGPA, Gold Medalist)

Experience:
- Senior Software Engineer at HCLTech: Developed Generative AI and Agentic AI solutions. Built Test Case Generation Tool (90.2% accuracy) and VHDL Analysis Tool using AWS Bedrock & LLaMA3.
- ML Developer Intern at Velozity Global IT Solutions: Delivered 30+ projects in Deep Learning.
- Machine Learning R&D Intern at Grootan Technologies: YOLO-based video analysis.

Projects:
- Amazon MSc Dissertation: Robust resume classifiers against LLM manipulations.
- Vibe Coding Tool: Built using LangGraph and Gemini API.
- Mathematical Reasoning of SLMs: Fine-tuned Qwen-2.5-0.5B on GSM8K.
- Sign Language Translation: Attention architecture study for ASL.

Skills:
- Programming: Python, C, C++, DPC++
- AI/ML: Agentic AI, RLHF, RAG, Fine-tuning, LLMs, Computer Vision
- Frameworks: PyTorch, TensorFlow, LangChain, LangGraph
- Languages: English, Japanese (JLPT N2), Tamil, Telugu

Achievements:
- 1st Prize, "Talk Your Walk to Japan" Speech Competition (Sponsored 2-week trip to Japan).
- 1st Place, Japanese Speech Contest by Japan Consulate Chennai.
- Top 150 in Google Cloud Agentic AI Hackathon.
`;

export async function chatWithPoorna(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";
  const ai = new GoogleGenAI({ apiKey });
  
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: `You are an AI assistant representing Poorna Siri Karanam. 
      Answer questions about Poorna's background, projects, and skills based on the provided context. 
      Be professional, friendly, and enthusiastic about AI. 
      If asked something not in the context, politely say you don't have that specific information but can talk about her AI expertise.
      Poorna is currently an MSc student at the University of Edinburgh. She loves Japan and speaks Japanese fluently (JLPT N2).
      
      Context: ${RESUME_CONTEXT}`
    },
    history: history,
  });

  const result = await chat.sendMessage({ message: message });
  return result.text;
}
