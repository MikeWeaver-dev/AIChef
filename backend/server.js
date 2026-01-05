import 'dotenv/config';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";
import fetch from "node-fetch";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Health check endpoint (fast response to keep service awake)
app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

app.post("/chat", async (req, res) => {
    try {
        const { prompt } = req.body;
        
        console.log("=================================");
        console.log("REQUEST RECEIVED");
        console.log("Model being requested: gpt-4o-mini");
        console.log("=================================");

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 1024,
            temperature: 0.8,
        });

        res.send(completion.choices[0].message.content);
    } catch (error) {
        console.error("OpenAI Error:", error.message);
        res.status(500).send("Error processing request. Ensure you are connected to the internet.");
    }
});

// All this does is ping the server every so often so the server never goes to sleep! Allows me to keep a free plan
const APP_URL = "https://aichefbackend.onrender.com/health";
const PING_INTERVAL = 10 * 60 * 1000; // Every 10 minutes rn

// Just one initial ping so I can see if its working
(async () => {
    try {
        await fetch(APP_URL);
        console.log("Initial self-ping sent");
    } catch (err) {
        console.error("Initial self-ping failed:", err.message);
    }
})();

// Repeats my ping on a set basis
setInterval(async () => {
    try {
        await fetch(APP_URL);
        console.log(`Self-ping successful at ${new Date().toISOString()}`);
    } catch (err) {
        console.error("Self-ping failed:", err.message);
    }
}, PING_INTERVAL);

// Start the server
const PORT = process.env.PORT || 8020;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("Ready to accept requests!");
});