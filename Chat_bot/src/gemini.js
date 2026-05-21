import { GoogleGenerativeAI } from "@google/generative-ai";
const api = import.meta.env.VITE_AI_API_KEY;

if (!api) {
  throw new Error('Missing VITE_AI_API_KEY in environment variables');
}

const genAI = new GoogleGenerativeAI(api);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const generationConfig =
{
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt) 
{
    try {
        if (!prompt || prompt.trim() === '') {
            throw new Error('Prompt cannot be empty');
        }

        const chatSession = model.startChat({
            generationConfig,
            history:[
            ],
        });

        
        const result = await chatSession.sendMessage(prompt);
        return(result.response.text());
    } catch (error) {
        console.error('API Error:', error);
        if (error.message.includes('API key')) {
            throw new Error('Invalid API key. Please check your VITE_AI_API_KEY');
        }
        if (error.message.includes('429')) {
            throw new Error('Rate limit exceeded. Please try again later');
        }
        throw new Error(`Failed to get response: ${error.message}`);
    }
}
export default run;
