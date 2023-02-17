const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createNote = async function (note, done) {
  const createdNote = await prisma.note.create({
    data: {
      ...note,
    },
  });
  console.log("created note", createdNote);
  if (!createdNote) {
    return done("error");
  }

  done(null, createdNote);
};

const getNotes = async function (user_id, done) {
  const notes = await prisma.note.findMany({
    where: {
      note_creator: user_id,
    },
  });
  if (!notes) {
    return done("error");
  }
  done(null, notes);
};

const getNote = async function (note_id, done) {
  const note = await prisma.note.findFirst({
    where: {
      note_id,
    },
  });
  if (!note) {
    return done("error");
  }
  done(null, note);
};

const updateNotes = async function (note_id, notesUpdate, done) {
  let { note_title, note_content, note_status } = notesUpdate;
  console.log("notes id", note_id);
  const notes = await prisma.note.update({
    where: {
      note_id,
    },
    data: {
      note_content,
      note_title,
      note_status,
    },
  });
  if (!notes) {
    return done("error");
  }
  done(null, notes);
};

const deleteNote = async function (note_id, done) {
  const notes = await prisma.note.delete({
    where: {
      note_id,
    },
  });
  if (!notes) {
    return done("error");
  }
  done(null, notes);
};

module.exports = {
  createNote,
  getNotes,
  getNote,
  updateNotes,
  deleteNote,
};
