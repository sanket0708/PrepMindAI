const { GoogleGenAI } = require("@google/genai");
const Groq = require("groq-sdk");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
} = require("../utils/prompts");

// Initialize AI clients
const geminiAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const groqAI = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Check if API key is set
if (!process.env.GROQ_API_KEY) {
  console.warn("WARNING: GROQ_API_KEY is not set in environment variables!");
}

//generate interview questions
//post /api/ai/generate-questions

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    // Check if API key is available
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        message: "Failed to generate questions",
        error: "Groq API key is not configured",
      });
    }

    // Use Groq API (faster and better free tier)
    // console.log("Calling Groq API with model: llama-3.3-70b-versatile");
    const response = await groqAI.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile", // Current recommended model
      temperature: 0.7,
      max_tokens: 3000,
    });
    
    // console.log("Groq API response received");

    // Extract text from Groq response
    let rawText = response.choices[0]?.message?.content;

    if (!rawText) {
      console.error("Invalid response structure:", response);
      return res.status(500).json({
        message: "Failed to generate questions",
        error: "Invalid response from AI API",
      });
    }

    // console.log("Raw text from AI (questions):", rawText);

    let cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    // console.log("Cleaned text for JSON.parse (questions):", cleanedText);

    // Try to extract JSON array from the response if it's wrapped in text
    let jsonMatch = cleanedText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      cleanedText = jsonMatch[0];
    }

    // Validate JSON before parsing
    if (!cleanedText || !cleanedText.startsWith("[")) {
      console.error("Response is not valid JSON array:", cleanedText);
      return res.status(500).json({
        message: "Failed to generate questions",
        error: "AI did not return valid JSON array",
      });
    }

    let data;
    try {
      data = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Failed to parse:", cleanedText);
      return res.status(500).json({
        message: "Failed to generate questions",
        error: "Failed to parse AI response",
      });
    }

    // Validate the response structure
    if (!Array.isArray(data) || data.length === 0) {
      console.error("Invalid data structure from AI:", data);
      return res.status(500).json({
        message: "Failed to generate questions",
        error: "AI did not return expected format (not an array or empty)",
      });
    }

    // console.log("Sending questions to frontend:", data.length, "questions");
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in generateInterviewQuestions:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error status:", error.status);
    console.error("Error code:", error.code);
    
    // Handle API key errors
    if (error.message?.includes("API key") || error.message?.includes("authentication")) {
      return res.status(500).json({
        message: "Failed to generate questions",
        error: "Invalid or missing Groq API key. Please check your configuration.",
      });
    }
    
    // Handle model not found errors
    if (error.status === 404 || error.message?.includes("does not exist") || error.message?.includes("not found")) {
      return res.status(500).json({
        message: "Failed to generate questions",
        error: "AI model not found. The model may have been updated. Please contact support.",
      });
    }
    
    // Handle model decommissioned errors
    if (error.status === 400 && error.message?.includes("decommissioned")) {
      return res.status(500).json({
        message: "AI model is no longer available. Please contact support.",
        error: "Model decommissioned",
      });
    }
    
    // Handle quota/rate limit errors (429)
    if (error.status === 429 || (error.message && error.message.includes("quota"))) {
      return res.status(429).json({
        message: "API quota exceeded. Please wait a moment and try again, or check your API plan.",
        error: "Rate limit exceeded",
        retryAfter: error.message?.match(/retry in ([\d.]+)s/)?.[1] || null,
      });
    }
    
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message || "Unknown error occurred",
    });
  }
};

//generate explains
// /api/ai/generate-explanation

const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    // Use Groq API (faster and better free tier)
    const response = await groqAI.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile", // Current recommended model
      temperature: 0.7,
      max_tokens: 2000,
    });

    // Extract text from Groq response
    let rawText = response.choices[0]?.message?.content;

    if (!rawText) {
      console.error("Invalid response structure:", response);
      return res.status(500).json({
        message: "Failed to generate explanation",
        error: "Invalid response from AI API",
      });
    }

    // console.log("Raw text from AI:", rawText);

    let cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    // console.log("Cleaned text for JSON.parse:", cleanedText);

    // Try to extract JSON from the response if it's wrapped in text
    let jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanedText = jsonMatch[0];
    }

    // Validate JSON before parsing
    if (!cleanedText || (!cleanedText.startsWith("{") && !cleanedText.startsWith("["))) {
      console.error("Response is not valid JSON:", cleanedText);
      // Fallback: return as plain text explanation
      return res.status(200).json({
        title: "Explanation",
        explanation: rawText,
      });
    }

    let data;
    try {
      data = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Failed to parse:", cleanedText);
      // Fallback: return as plain text explanation
      return res.status(200).json({
        title: "Explanation",
        explanation: rawText,
      });
    }
    
    // Validate the response structure
    if (!data.title || !data.explanation) {
      console.error("Invalid data structure from AI:", data);
      return res.status(500).json({
        message: "Failed to generate explanation",
        error: "AI did not return expected format (missing title or explanation)",
      });
    }
    
    // console.log("Sending response to frontend:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in generateConceptExplanation:", error);
    
    // Handle model decommissioned errors
    if (error.status === 400 && error.message?.includes("decommissioned")) {
      return res.status(500).json({
        message: "AI model is no longer available. Please contact support.",
        error: "Model decommissioned",
      });
    }
    
    // Handle quota/rate limit errors (429)
    if (error.status === 429 || (error.message && error.message.includes("quota"))) {
      return res.status(429).json({
        message: "API quota exceeded. Please wait a moment and try again, or check your API plan.",
        error: "Rate limit exceeded",
        retryAfter: error.message?.match(/retry in ([\d.]+)s/)?.[1] || null,
      });
    }
    
    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };
