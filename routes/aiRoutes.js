import express from "express";
import multer from "multer";
import { transcribeNote, summarizeNote } from "../controllers/aiController.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/transcribe", transcribeNote);
router.post("/summarize/:id", summarizeNote);

export default router;
