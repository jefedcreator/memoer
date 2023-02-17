const noteService = require('../service/notes.service')

const createNote = (note,done) => {
    noteService.createNote(note,done);
}

const getNotes = (user_id,done) => {
    noteService.getNotes(user_id,done);
}

const updateNotes = (note_id,notesUpdate,done) => {
    noteService.updateNotes(note_id,notesUpdate,done);
}

const deleteNote = (note_id,done) => {
    noteService.deleteNote(note_id,done);
}



module.exports = {
    createNote,
    getNotes,
    updateNotes,
    deleteNote
}