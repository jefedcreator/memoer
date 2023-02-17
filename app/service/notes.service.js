const notesDao = require('../dao/notes.dao')

const createNote = (note,done) => {
    notesDao.createNote(note,done);
}

const getNotes = (user_id,done) => {
    notesDao.getNotes(user_id,done);
}

const updateNotes = (note_id,notesUpdate,done) =>{
    notesDao.updateNotes(note_id,notesUpdate,done)
}

const deleteNote = (note_id,done) => {
    notesDao.deleteNote(note_id,done);
}

module.exports = {
    createNote,
    getNotes,
    updateNotes,
    deleteNote
}