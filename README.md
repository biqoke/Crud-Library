# CRUD Library

## Overview

This project implements a CRUD (Create, Read, Update, Delete) library API for managing information about books, authors, and genres. The project uses Express.js for the API, MongoDB for data storage (optional), and Excel for data import/export.

## Features

- CRUD operations for Books, Authors, and Genres
- Excel import/export for data (optional MongoDB usage)
- Validation for input fields
- Filtering and pagination for GET requests
- Clean and organized project structure

## Project Structure

The project follows the MVC (Model-View-Controller) architecture and has the following structure:

/project-root
├── /controllers
│ ├── booksController.js
│ ├── authorsController.js
│ └── genresController.js
├── /models
│ ├── bookModel.js
│ ├── authorModel.js
│ └── genreModel.js
├── /routes
│ ├── booksRoutes.js
│ ├── authorsRoutes.js
│ └── genresRoutes.js
├── /utils
│ └── excelUtils.js
├── app.js
├── config.js
└── README.md


## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (https://nodejs.org/)
- npm (Node Package Manager)
- MongoDB (optional, if used)
