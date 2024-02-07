const express = require('express');
const bodyParser = require('body-parser');
const booksRoutes = require('./routes/booksRoutes');
const authorsRoutes = require('./routes/authorsRoutes');
const genresRoutes = require('./routes/genresRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', booksRoutes);
app.use('/api', authorsRoutes);
app.use('/api', genresRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
