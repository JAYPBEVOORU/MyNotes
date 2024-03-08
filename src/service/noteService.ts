import { NoteAlreadyExists } from "../exceptions/NoteAlreadyExists";
import { INote, Note, NoteCreateRequest } from "../model/note";
import { isDuplicateDocError } from "../util";

/**
 *
 * @param userEmail
 * @returns list of Notes created by userId
 */
const getUserNotes = async (userId: string): Promise<INote[]> => {
  return await Note.find({ createdBy: userId }).select(["title", "createdAt"]);
};

/**
 *
 * @param userEmail
 * @returns a single note with id noteId, created by userId
 */
const getUserNoteById = async (userId: string, noteId: string): Promise<INote | null> => {
  return await Note.findOne({ _id: noteId, createdBy: userId });
};

/**
 *
 * @param userEmail
 * @param note
 * @returns Note created by userId
 */
const addNote = async (userId: string, noteCreateRequest: NoteCreateRequest): Promise<INote> => {
  try {
    const createdNote = await Note.create({
      ...noteCreateRequest,
      createdBy: userId
    });
    return createdNote;
  } catch (err) {
    if (err instanceof Error && isDuplicateDocError(err as Error)) {
      throw new NoteAlreadyExists(`Note with same title already exists for the user`);
    } else {
      throw err;
    }
  }
};

export { getUserNoteById, getUserNotes, addNote };
