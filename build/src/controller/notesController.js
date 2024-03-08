"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesController = void 0;
const tsoa_1 = require("tsoa");
const noteService_1 = require("../service/noteService");
const log_1 = require("../log");
let NotesController = class NotesController extends tsoa_1.Controller {
    async getUserNotes(_accessToken, request) {
        log_1.logger.debug(`getting all notes of user: ${request.params.userEmail}`);
        const notes = await (0, noteService_1.getUserNotes)(request.params.userId);
        log_1.logger.debug(`got ${notes.length} notes of user ${request.params.userEmail}`);
        return notes;
    }
    async getUserNoteById(_accessToken, request, noteId) {
        log_1.logger.debug(`getting note of user: ${request.params.userEmail} with id: ${noteId}`);
        const note = await (0, noteService_1.getUserNoteById)(request.params.userId, noteId);
        if (!note) {
            log_1.logger.debug(`note with id: ${noteId} doesn't exists for user: ${request.params.userEmail}`);
            this.setStatus(404);
        }
        return note;
    }
    async createNote(_accessToken, request, note) {
        log_1.logger.debug(`creating note: ${note} for user: ${request.params.userEmail}`);
        const createdNote = await (0, noteService_1.addNote)(request.params.userId, note);
        log_1.logger.debug(`created note for user ${request.params.userEmail}`);
        this.setStatus(201);
        return createdNote;
    }
};
exports.NotesController = NotesController;
__decorate([
    (0, tsoa_1.SuccessResponse)(200),
    (0, tsoa_1.Response)(401, "Invalid token"),
    (0, tsoa_1.Get)(),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Request)())
], NotesController.prototype, "getUserNotes", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(200),
    (0, tsoa_1.Response)(401, "Invalid token"),
    (0, tsoa_1.Response)(404, "Note doesn't exists"),
    (0, tsoa_1.Get)("{noteId}"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Request)()),
    __param(2, (0, tsoa_1.Path)())
], NotesController.prototype, "getUserNoteById", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(201, "Note created"),
    (0, tsoa_1.Response)(401, "Invalid token"),
    (0, tsoa_1.Response)(409, "Note with same title exists"),
    (0, tsoa_1.Post)(),
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Example)({
        title: "My first note",
        content: "It's a bright day today",
    }),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Request)()),
    __param(2, (0, tsoa_1.Body)())
], NotesController.prototype, "createNote", null);
exports.NotesController = NotesController = __decorate([
    (0, tsoa_1.Route)("notes")
], NotesController);
