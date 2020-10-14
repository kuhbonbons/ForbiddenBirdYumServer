const { Op } = require('sequelize');

async function createNote(fastify, body) {
  const { Note, Section } = fastify.models;
  const user = fastify.session;
  let { sections } = body;
  sections = sections.map((section, index) => ({ ...section, index }));
  await Note.create({
    ...body, user_id: user.id, Sections: sections,
  }, { include: [Section] });
}

async function getNotes(fastify) {
  const { Note, Section } = fastify.models;
  const user = fastify.session;
  return Note.findAll({
    where: {
      user_id: user.id,
    },
    limit: 25,
    include: Section,
  });
}

async function getNoteById(fastify, id) {
  const { Note, Section } = fastify.models;
  const user = fastify.session;
  return Note.findOne({
    where: {
      [Op.and]: {
        user_id: user.id,
        id,
      },
    },
    include: Section,
  });
}

async function deleteNote(fastify, id) {
  const { Note, Section } = fastify.models;
  const user = fastify.session;
  return Note.destroy({
    where: {
      [Op.and]: {
        user_id: user.id,
        id,
      },
    },
    include: Section,
  });
}

// We just delete the old sections and create the new ones
async function updateNote(fastify, {
  id, note: {
    sections: patchedSections,
    ...patchedNote
  },
}) {
  const { Note, Section } = fastify.models;
  const user = fastify.session;
  const note = await Note.findOne({
    where: {
      [Op.and]: {
        user_id: user.id,
        id,
      },
    },
    include: Section,
  });
  if (!note) throw fastify.httpErrors.badRequest();
  const sections = note.Sections;
  const deleteIds = sections.reduce((acc, sec) => [...acc, { id: sec.id }], []);
  const transaction = await fastify.sequelize.transaction();
  try {
    await Promise.all([
      Section.destroy({
        where: {
          [Op.or]: deleteIds,
        },
      }, { transaction }),
      ...patchedSections.map(async (sec, index) => Section.create({
        index,
        ...sec,
        note_id: note.id,
      }, { transaction })),
      note.update(patchedNote, { transaction }),
    ]);
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
/**
 This would be needed if we allowed updating through the api, but requests will only be
 coming from the UI, theres no need to update a single section. Instead we will just delete all
 sections and create the ones we get from the UI.
 * */

/* async function updateNote(fastify, { id, patchedNote }) {
  const { Note, Section } = fastify.models;
  const user = fastify.session;
  const note = await Note.findOne({
    where: {
      [Op.and]: {
        user_id: user.id,
        id,
      },
    },
    include: Section,
  });
  if (!note) throw fastify.httpErrors.badRequest();
  const sections = note.Sections;
  const transaction = await fastify.sequelize.transaction();
  try {
    const { diffs, latest } = Section.getPatchedSections(sections, patchedNote.sections);
    await Promise.all([
      ...diffs.map((section) => Section.update({ ...section, note_id: note.note_id }, {
        where: {
          id: section.id,
        },
      }, { transaction })),
      ...latest.map((section) => note.createSection(section, { transaction })),
    ]);
    await note.update(patchedNote, { transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
} */

module.exports = {
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  createNote,
};
