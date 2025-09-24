import Note from "../models/NoteSchema.js";
import { transcribeAudio, summarizeText } from "../services/geminiService.js";


export const transcribeNote = async (req, res, next) => {
  try {
    const { audioUrl } = req.body;
    if (!audioUrl) {
      return res.status(400).json({ message: "No audio URL provided" });
    }

    const transcript = await transcribeAudio(audioUrl);

    const note = await Note.create({ transcript, audioUrl });
    res.json(note);
  } catch (err) {
    next(err);
  }
};


export const summarizeNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.summary) return res.status(400).json({ message: "Already summarized" });

    const summary = await summarizeText(note.transcript);
    note.summary = summary;
    await note.save();

    res.json(note);
  } catch (err) {
    next(err);
  }
};
