import 'dotenv/config';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai/index.js";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

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
        res.status(500).send("Error processing request. Ensure you are connected to the internet.");
    }
});

const PORT = 8020;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    console.log("Ready to accept requests!");
});