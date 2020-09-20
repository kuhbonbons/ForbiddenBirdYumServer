const NoteService = require('../services/note');

async function create(fastify, request, response) {
  try {
    await NoteService.createNote(fastify, request.body);
    response.status(204);
    return null;
  } catch (error) {
    fastify.log.error('Error while creating Note');
    throw error;
  }
}

async function list(fastify) {
  try {
    const notes = await NoteService.getNotes(fastify);
    return {
      notes,
    };
  } catch (error) {
    fastify.log.error('Error while getting Notes');
    throw error;
  }
}

async function find(fastify, request) {
  try {
    const note = await NoteService.getNoteById(fastify, request.params.id);
    return note;
  } catch (error) {
    fastify.log.error('Error while getting Note');
    throw error;
  }
}
async function remove(fastify, request, response) {
  try {
    await NoteService.deleteNote(fastify, request.params.id);
    response.status(204);
    return null;
  } catch (error) {
    fastify.log.error('Error while deleting Note');
    throw error;
  }
}

async function update(fastify, request, response) {
  try {
    await NoteService.updateNote(fastify, {
      ...request.params,
      patchedNote: request.body,
    });
    response.status(204);
    return null;
  } catch (error) {
    fastify.log.error('Error while updating Note');
    throw error;
  }
}
module.exports = {
  find,
  remove,
  update,
  list,
  create,
};
