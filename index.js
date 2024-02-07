const express = require('express')
const app = express()
app.use(express.json())
const PORT = 3000

const authorRoutes = require('./app/routers/authorsRouter')
const bookRoutes = require('./app/routers/booksRouter')
const genreRoutes = require('./app/routers/genresRouter')

app.use('/books', bookRoutes)
app.use('/authors', authorRoutes)
app.use('/genres', genreRoutes)

app.listen(PORT, () => {
	console.log(`The server is running on http://localhost:${PORT}`)
})