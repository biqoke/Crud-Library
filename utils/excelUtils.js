const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const config = require('../config');

const excelFilePath = path.join(config.excelFilePath, 'a1_data.xlsx');

const readExcelFile = (sheetName) => {
    try {
        const workbook = xlsx.readFile(excelFilePath);
        const sheet = workbook.Sheets[sheetName];
        let data = xlsx.utils.sheet_to_json(sheet);

        // Assign unique IDs to each item
        data = data.map((item, index) => ({ id: index + 1, ...item }));

        return data;
    } catch (error) {
        console.error('Error reading Excel file:', error);
        return [];
    }
};

const writeExcelFile = (sheetName, data) => {
    try {
        const workbook = xlsx.readFile(excelFilePath);

        const sheetIndex = workbook.SheetNames.indexOf(sheetName);
        if (sheetIndex !== -1) {
            const existingSheet = xlsx.utils.json_to_sheet(data);
            workbook.Sheets[sheetName] = existingSheet;
        } else {
            const newSheet = xlsx.utils.json_to_sheet(data);
            xlsx.utils.book_append_sheet(workbook, newSheet, sheetName);
        }

        xlsx.writeFile(workbook, excelFilePath);
        console.log('Excel file updated successfully.');
    } catch (error) {
        console.error('Error writing Excel file:', error);
    }
};


module.exports = {
    readExcelFile,
    writeExcelFile,
};
