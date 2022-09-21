const express = require('express');
const apiRoutes = require('./routes/index.js');
const htmlRoutes = require('./routes/htmlroute')

const PORT = process.env.PORT || 3001;
const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('', htmlRoutes);

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
