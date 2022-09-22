const express = require('express');
// Import our modular routers for html and notes
const notesRouter = require('../routes/notesroute');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;