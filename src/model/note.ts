import mongoose, { InferSchemaType, Schema } from "mongoose";

interface INote {
  title: string;
  createdBy: string;
  content?: string;
}

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: [true, "Note title can't be empty"],
      trim: true,
    },
    createdBy: {
      type: String,
      required: [true, "Created by can't be empty"],
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);
noteSchema.index({ title: 1, createdBy: 1 }, { unique: true });

type NoteCreateRequest = Pick<INote, "title" | "content">;
const Note = mongoose.model<INote>("NoteSchema", noteSchema);
export { INote, Note, NoteCreateRequest };
