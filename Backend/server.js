// server.js
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const fs = require('fs');
const loginRoutes = require('./Routes/Loginroutes');
const Signuproutes = require("./Routes/Signuproutes");
const uploadRoute = require('./Routes/uploadRoute');
const cors = require('cors');
const bodyParser = require("body-parser");
require('dotenv').config();
const User = require('./Model/Schema');
const path = require('path');
const morgan = require('morgan'); 


const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev')); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
if (!GEMINI_API_KEY) {
  
  console.error("CRITICAL ERROR: GEMINI_API_KEY is not set in your .env file!");
  process.exit(1);
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const generationConfig = {
  temperature: 0.8,     // Controls randomness/creativity (0.0-1.0). Higher = more creative.
  topP: 0.95,         
  topK: 64,             
  maxOutputTokens: 200, 
};


// Routes
app.use("/login", loginRoutes);
app.use("/signup", Signuproutes); // This route conflicts with the custom /signup POST below. You might want to remove one.
app.use("/upload", uploadRoute);

// --- NEW: AI Chat Endpoint ---
app.post('/api/chat', async (req, res) => {
  // <--- NEW: Log the incoming request body for debugging
  console.log('Backend: Received /api/chat request body:', req.body);

  // Expects 'userPrompt' (current message) and 'conversationHistory' (previous messages) from frontend
  const { userPrompt, conversationHistory = [] } = req.body;

  // Basic validation for user prompt
  if (!userPrompt) {
    return res.status(400).json({ message: "User prompt is required." });
  }

  // Prepare conversation history for Gemini's 'contents' array
  // Gemini expects history in a specific format: [{ role: 'user', parts: [{ text: '...' }] }, { role: 'model', parts: [{ text: '...' }] }]
  const contents = conversationHistory.map(entry => ({
    role: entry.role, // This should be 'user' or 'model'
    parts: [{ text: entry.text }]
  }));
  // Add the current user's prompt to the conversation history for this turn
  contents.push({ role: "user", parts: [{ text: userPrompt }] });

  try {
    // Call Gemini API to generate content based on conversation history
    const result = await geminiModel.generateContent({
      contents: contents, // Pass the full conversation history
      generationConfig,  // Apply generation parameters
      safetySettings,    // Apply safety filters
    });

    const response = await result.response;
    const geminiTextResponse = response.text().trim(); // Get the AI's clean text response

    // Send Gemini's text response back to the frontend
    res.json({ text: geminiTextResponse });

  } catch (error) {
    // <--- NEW: More specific error log for this try-catch block
    console.error("Backend: Error in /api/chat Gemini processing:", error.message, error.stack);

    let errorMessage = "Sorry, I'm currently unable to process your request. Please try again.";
    let statusCode = 500; // Default to internal server error

    // More specific error messages based on common Gemini API errors
    if (error.message.includes("404") || error.message.includes("model")) {
      errorMessage = "AI model is not found or unavailable. This might be a temporary issue or model name error.";
      statusCode = 404;
    } else if (error.message.includes("429")) {
      errorMessage = "I'm receiving too many requests. Please wait a moment and try again.";
      statusCode = 429;
    } else if (error.message.includes("denied") || error.message.includes("API key")) {
      errorMessage = "Access to the AI is denied. Please ensure your API key is valid and billing is set up.";
      statusCode = 403; // Forbidden
    } else if (error.message.includes("safety") || (error.response && error.response.promptFeedback && error.response.promptFeedback.blockReason)) {
      // If content was blocked by safety settings
      errorMessage = "I cannot respond to that query due to safety guidelines. Please ask something else.";
      statusCode = 400; // Bad request from client
    }

    // Send a structured error response to the frontend
    res.status(statusCode).json({ message: errorMessage });
  }
});


// Default route (existing)
app.get('/', (req, res) => {
  res.send('Ha bhai developer sahab ky haal hai..!!');
});

// Signup route (existing - Note: This directly overrides app.use("/signup", Signuproutes) above if it's placed after.)
// Consider putting all routes through `app.use` for better organization.
app.post("/signup", async (req, res) => {
  try {
    const { name, lastname, email, permanentadd, Pincode, contactnum, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, lastname, email, permanentadd, Pincode, contactnum, password, role });
    await newUser.save();

    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin route to get submissions (existing)
app.get("/admin/submissions", async (req, res) => {
  try {
    const metadataPath = path.join(__dirname, 'uploads', 'submissions.json');
    if (fs.existsSync(metadataPath)) {
      const submissions = JSON.parse(fs.readFileSync(metadataPath));
      res.json(submissions);
    } else {
      res.json([]);
    }
  } catch (err) {
    console.error("Error in /admin/submissions:", err);
    res.status(500).json({ error: "Failed to read submissions" });
  }
});

// MongoDB Connection (existing)
mongoose.connect("mongodb://localhost:27017/LMSAI", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("Error connecting to DB:", err));

// Start the server (existing)
const PORT = process.env.PORT || 5002; // Using 5002 as your default
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));