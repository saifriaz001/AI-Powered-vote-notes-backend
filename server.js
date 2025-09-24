import 'dotenv/config'; 
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDb from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";



const app = express();


const corsOptions = {
  origin: [ "http://localhost:5173","https://ai-powered-vote-notes-frontend.vercel.app" ], // allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // allowed headers
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/notes", noteRoutes);
app.use("/api/ai", aiRoutes);

await connectDb();

app.get("/", (req, res) => {
  res.send("API is running...");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

