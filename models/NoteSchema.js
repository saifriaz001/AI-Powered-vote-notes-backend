import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    audioUrl: { type: String },         // optional (store path if needed)
    transcript: { type: String, required: true },
    summary: { type: String  },
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board" }
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
