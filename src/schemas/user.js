const signUpSchema = {
  body: {
    type: 'object',
    required: ['username', 'password', 'email'],
    properties: {
      username: { type: 'string', maxLength: 12, minLength: 4 },
      password: { type: 'string', maxLength: 255, minLength: 8 },
      email: { type: 'string', maxLength: 255, format: 'email' },
    },
  },
};

const loginSchema = {
  body: {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: { type: 'string', maxLength: 12, minLength: 4 },
      password: { type: 'string', maxLength: 255, minLength: 8 },
    },
  },
};

module.exports = {
  signUpSchema,
  loginSchema,
};
