const excelUtils = require('../utils/excelUtils');
const Author = require('../models/authorModel');

let authorsData = excelUtils.readExcelFile('authors');


module.exports = {
    getAllAuthors: (req, res) => {
        let filteredAuthors = [...authorsData];

        // Filter by Name
        const nameFilter = req.query.name;
        if (nameFilter) {
            filteredAuthors = filteredAuthors.filter(author => author.name.toLowerCase().includes(nameFilter.toLowerCase()));
        }

        // Filter by Surname
        const surnameFilter = req.query.surname;
        if (surnameFilter) {
            filteredAuthors = filteredAuthors.filter(author => author.surname.toLowerCase().includes(surnameFilter.toLowerCase()));
        }

        // Pagination
        const perPage = parseInt(req.query.perPage) || 10;
        const page = parseInt(req.query.page) || 1;
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;

        const paginatedAuthors = filteredAuthors.slice(startIndex, endIndex);

        res.json({
            total: filteredAuthors.length,
            page,
            perPage,
            authors: paginatedAuthors,
        });
    },
    addAuthor: (req, res) => {
        const newAuthor = new Author(req.body.id, req.body.surname, req.body.name, req.body.birthday);

        authorsData.push(newAuthor);
        excelUtils.writeExcelFile('authors', authorsData);
        res.json({ message: 'Author added successfully' });
    },
    updateAuthor: (req, res) => {
        const authorIdToUpdate = parseInt(req.params.id);
        const updatedAuthorData = req.body;

        // Find the index of the author to update
        const authorIndex = authorsData.findIndex(author => author.id === authorIdToUpdate);

        if (authorIndex !== -1) {
            // Update the author data
            authorsData[authorIndex] = { ...authorsData[authorIndex], ...updatedAuthorData };
            excelUtils.writeExcelFile('authors', authorsData);
            res.json({ message: 'Author updated successfully' });
        } else {
            res.status(404).json({ message: 'Author not found' });
        }
    },
    deleteAuthor: (req, res) => {
        const authorIdToDelete = parseInt(req.params.id);

        // Check if the author with the specified ID exists
        const authorToDelete = authorsData.find(author => author.id === authorIdToDelete);

        if (authorToDelete) {
            // Filter out the author to delete
            authorsData = authorsData.filter(author => author.id !== authorIdToDelete);
            excelUtils.writeExcelFile('authors', authorsData);
            res.json({ message: 'Author deleted successfully' });
        } else {
            res.status(404).json({ message: 'Author not found' });
        }
    },
};
