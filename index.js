import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);
import express from "express"
import connectDB from "./src/config/db.js"
import dotenv from "dotenv"
import cors from "cors"
import courseRoutes from "./src/Routes/course.routes.js"
import studentRoutes from "./src/Routes/student.routes.js"
import enrollmentRoutes from "./src/Routes/enrollment.routes.js"
import authRoutes from "./src/Routes/auth.routes.js"
import userRoutes from "./src/Routes/user.routes.js"
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();
app.use(express.json());


app.use(cors({
    origin:"http://localhost:3000",
    credential:true
}))

app.use("/course", courseRoutes);
app.use("/student", studentRoutes);
app.use("/enrollment", enrollmentRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
app.post("/chat", async(req, res) => {
    try{
        const { prompt } = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        res.json({
            response: response.text,
            // fullResponse: response
        });
    }catch(error){
        return res.status(500).json({message:"server error" , error: error.message})
    }
})


app.post("/teacher", async(req, res) => {
    try{
        const { prompt } = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            config: {
                    systemInstruction: `
                You are an expert programming teacher.

                Rules:
                - Explain concepts simply.
                - Use analogies.
                - Give one small example.
                - Keep responses concise.
                - return your response in ready to json parsable form with 4 keys question, answer, example, analogy
            
                `,
            },
            contents: prompt,
        });

        res.json({
            response: JSON.parse(response.text),
            // fullResponse: response
        });
    }catch(error){
        return res.status(500).json({message:"server error" , error: error.message})
    }
})


connectDB().
then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server started!!");
    })
}).
catch((error) => {
    console.log(error.message);
})


