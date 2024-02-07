const excelUtils = require('../utils/excelUtils');
const Book = require('../models/bookModel');

let booksData = excelUtils.readExcelFile('books');

module.exports = {
    getAllBooks: (req, res) => {
        let filteredBooks = [...booksData];

        // Filter by Name
        const nameFilter = req.query.name;
        if (nameFilter) {
            filteredBooks = filteredBooks.filter(book => book.name.toLowerCase().includes(nameFilter.toLowerCase()));
        }

        // Filter by Price
        const priceFilter = req.query.price;
        if (priceFilter) {
            filteredBooks = filteredBooks.filter(book => book.price === parseFloat(priceFilter));
        }

        // Sorting by Price
        const sortType = req.query.sort;
        if (sortType === 'asc') {
            filteredBooks.sort((a, b) => a.price - b.price);
        } else if (sortType === 'desc') {
            filteredBooks.sort((a, b) => b.price - a.price);
        }

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;

        const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

        res.json({
            total: filteredBooks.length,
            page,
            perPage,
            books: paginatedBooks,
        });
    },


    addBook: (req, res) => {
        const newBook = new Book(req.body.id, req.body.name, req.body.author, req.body.publisherYear, req.body.pagesCount, req.body.price);
        booksData.push(newBook);
        excelUtils.writeExcelFile('books', booksData);
        res.json({ message: 'Book added successfully' });
    },
    updateBook: (req, res) => {
        const bookIdToUpdate = parseInt(req.params.id);
        const updatedBookData = req.body;

        // Find the index of the book to update
        const bookIndex = booksData.findIndex(book => book.id === bookIdToUpdate);

        if (bookIndex !== -1) {
            // Update the book data
            booksData[bookIndex] = { ...booksData[bookIndex], ...updatedBookData };
            excelUtils.writeExcelFile('books', booksData);
            res.json({ message: 'Book updated successfully' });
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    },
    deleteBook: (req, res) => {

        const bookId = parseInt(req.params.id);

        const bookIndex = booksData.findIndex(book => book.id == bookId);

        if (bookIndex !== -1) {
            booksData.splice(bookIndex, 1);
            res.json({ message: 'The book has been successfully deleted' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    },
};
