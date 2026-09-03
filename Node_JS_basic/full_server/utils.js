import fs from 'fs';

/**
 * Reads the database asynchronously and groups the students' firstnames
 * by field.
 * @param {string} path - path to the CSV database file.
 * @returns {Promise<Object>} an object of arrays of firstnames per field.
 */
export function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = lines.slice(1);

      const fields = {};

      students.forEach((line) => {
        const row = line.split(',');
        const firstname = row[0];
        const field = row[row.length - 1];

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      });

      resolve(fields);
    });
  });
}

export default readDatabase;
