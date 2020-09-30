const createNote = {
  body: {
    type: 'object',
    required: ['title', 'summary', 'sections'],
    properties: {
      title: { type: 'string', maxLength: 255, minLength: 8 },
      description: { type: 'string', maxLength: 255, minLength: 10 },
      summary: { type: 'string', maxLength: 500, minLength: 50 },
      sections: {
        type: 'array',
        maxItems: 50,
        minItems: 1,
        items: {
          type: 'object',
          required: ['keyword', 'content'],
          properties: {
            keyword: { type: 'string', maxLength: 255, minLength: 10 },
            content: { type: 'string', maxLength: 65000, minLength: 10 },
          },
        },
      },
    },
  },
};

const findNote = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
};

const deleteNote = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
};

const updateNote = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
  body: {
    type: 'object',
    required: ['title', 'summary', 'sections'],
    properties: {
      title: { type: 'string', maxLength: 255, minLength: 8 },
      description: { type: 'string', maxLength: 255, minLength: 10 },
      summary: { type: 'string', maxLength: 500, minLength: 50 },
      sections: {
        type: 'array',
        maxItems: 50,
        minItems: 1,
        items: {
          type: 'object',
          required: ['keyword', 'content'],
          properties: {
            keyword: { type: 'string', maxLength: 255, minLength: 10 },
            content: { type: 'string', maxLength: 65000, minLength: 10 },
          },
        },
      },
    },
  },
};

module.exports = {
  findNote,
  deleteNote,
  createNote,
  updateNote,
};
