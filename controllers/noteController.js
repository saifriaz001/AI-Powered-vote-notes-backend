import Note from "../models/NoteSchema.js";


export const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    next(err);
  }
};


export const createNote = async (req, res, next) => {
  try {
    const { transcript } = req.body;
    const note = await Note.create({ transcript });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};


export const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { transcript, summary } = req.body;

    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    // ✅ Update transcript and clear summary only if transcript changed
    if (transcript && transcript !== note.transcript) {
      note.transcript = transcript;
      note.summary = null; // clear old summary if transcript changes
    }

    // ✅ Allow updating summary directly
    if (summary !== undefined) {
      note.summary = summary;
    }

    await note.save();
    res.json(note);
  } catch (err) {
    next(err);
  }
};


export const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    next(err);
  }
};
