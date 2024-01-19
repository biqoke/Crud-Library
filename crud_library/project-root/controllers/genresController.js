const excelUtils = require('../utils/excelUtils');
const Genre = require('../models/genreModel');

let genresData = excelUtils.readExcelFile('genres');


module.exports = {
    getAllGenres: (req, res) => {
        let filteredGenres = [...genresData];

        // Filter by Name
        const nameFilter = req.query.name;
        if (nameFilter) {
            filteredGenres = filteredGenres.filter(genre => genre.name.toLowerCase().includes(nameFilter.toLowerCase()));
        }

        res.json({
            total: filteredGenres.length,
            genres: filteredGenres,
        });

    },
    addGenre: (req, res) => {
        const newGenre = new Genre(req.body.id, req.body.name);
        genresData.push(newGenre);
        excelUtils.writeExcelFile('genres', genresData);
        res.json({ message: 'Genre added successfully' });
    },
    updateGenre: (req, res) => {
        const genreIdToUpdate = parseInt(req.params.id);
        const updatedGenreData = req.body;

        // Find the index of the genre to update
        const genreIndex = genresData.findIndex(genre => genre.id === genreIdToUpdate);

        if (genreIndex !== -1) {
            // Update the genre data
            genresData[genreIndex] = { ...genresData[genreIndex], ...updatedGenreData };
            excelUtils.writeExcelFile('genres', genresData);
            res.json({ message: 'Genre updated successfully' });
        } else {
            res.status(404).json({ message: 'Genre not found' });
        }
    },
    deleteGenre: (req, res) => {
        const genreIdToDelete = parseInt(req.params.id);

        // Check if the genre with the specified ID exists
        const genreToDelete = genresData.find(genre => genre.id === genreIdToDelete);

        if (genreToDelete) {
            // Filter out the genre to delete
            genresData = genresData.filter(genre => genre.id !== genreIdToDelete);
            excelUtils.writeExcelFile('genres', genresData);
            res.json({ message: 'Genre deleted successfully' });
        } else {
            res.status(404).json({ message: 'Genre not found' });
        }
    },
};
