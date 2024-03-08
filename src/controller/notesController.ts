import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  Security,
  SuccessResponse,
  Request,
  Example,
  Response,
} from "tsoa";
import { INote, NoteCreateRequest } from "../model/note";
import * as express from "express";
import { addNote, getUserNoteById, getUserNotes } from "../service/noteService";
import { logger } from "../log";

@Route("notes")
export class NotesController extends Controller {
  @SuccessResponse(200)
  @Response(401, "Invalid token")
  @Get()
  @Security("jwt")
  public async getUserNotes(
    @Query() _accessToken: string,
    @Request() request: express.Request
  ): Promise<INote[]> {
    logger.debug(`getting all notes of user: ${request.params.userEmail}`);
    const notes = await getUserNotes(request.params.userId);
    logger.debug(
      `got ${notes.length} notes of user ${request.params.userEmail}`
    );
    return notes;
  }

  @SuccessResponse(200)
  @Response(401, "Invalid token")
  @Response(404, "Note doesn't exists")
  @Get("{noteId}")
  @Security("jwt")
  public async getUserNoteById(
    @Query() _accessToken: string,
    @Request() request: express.Request,
    @Path() noteId: string
  ): Promise<INote | null> {
    logger.debug(
      `getting note of user: ${request.params.userEmail} with id: ${noteId}`
    );
    const note = await getUserNoteById(request.params.userId, noteId);
    if (!note) {
      logger.debug(
        `note with id: ${noteId} doesn't exists for user: ${request.params.userEmail}`
      );
      this.setStatus(404);
    }
    return note;
  }

  @SuccessResponse(201, "Note created")
  @Response(401, "Invalid token")
  @Response(409, "Note with same title exists")
  @Post()
  @Security("jwt")
  @Example<NoteCreateRequest>({
    title: "My first note",
    content: "It's a bright day today",
  })
  public async createNote(
    @Query() _accessToken: string,
    @Request() request: express.Request,
    @Body() note: NoteCreateRequest
  ): Promise<INote> {
    logger.debug(
      `creating note: ${note} for user: ${request.params.userEmail}`
    );
    const createdNote = await addNote(request.params.userId, note);
    logger.debug(`created note for user ${request.params.userEmail}`);
    this.setStatus(201);
    return createdNote;
  }
}
