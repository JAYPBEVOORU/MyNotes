"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNote = exports.getUserNotes = exports.getUserNoteById = void 0;
const NoteAlreadyExists_1 = require("../exceptions/NoteAlreadyExists");
const note_1 = require("../model/note");
const util_1 = require("../util");
/**
 *
 * @param userEmail
 * @returns list of Notes created by userId
 */
const getUserNotes = async (userId) => {
    return await note_1.Note.find({ createdBy: userId }).select(["title", "createdAt"]);
};
exports.getUserNotes = getUserNotes;
/**
 *
 * @param userEmail
 * @returns a single note with id noteId, created by userId
 */
const getUserNoteById = async (userId, noteId) => {
    return await note_1.Note.findOne({ _id: noteId, createdBy: userId });
};
exports.getUserNoteById = getUserNoteById;
/**
 *
 * @param userEmail
 * @param note
 * @returns Note created by userId
 */
const addNote = async (userId, noteCreateRequest) => {
    try {
        const createdNote = await note_1.Note.create({
            ...noteCreateRequest,
            createdBy: userId,
        });
        return createdNote;
    }
    catch (err) {
        if (err instanceof Error && (0, util_1.isDuplicateDocError)(err)) {
            throw new NoteAlreadyExists_1.NoteAlreadyExists(`Note with same title already exists for the user`);
        }
        else {
            throw err;
        }
    }
};
exports.addNote = addNote;
