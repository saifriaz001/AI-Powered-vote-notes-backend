import express from "express";
import { getNotes, createNote, updateNote, deleteNote } from "../controllers/noteController.js";

const router = express.Router();

router.get("/getNotes", getNotes);
router.post("/createNote", createNote);
router.put("/updateNote/:id", updateNote);
router.delete("/deleteNote/:id", deleteNote);

export default router;
