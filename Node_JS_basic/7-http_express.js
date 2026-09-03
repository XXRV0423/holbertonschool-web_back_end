const express = require('express');
const fs = require('fs');

const args = process.argv.slice(2);
const database = args[0];

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
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

      let output = `Number of students: ${students.length}`;

      for (const field in fields) {
        if (Object.prototype.hasOwnProperty.call(fields, field)) {
          const list = fields[field];
          output += `\nNumber of students in ${field}: ${list.length}. List: ${list.join(', ')}`;
        }
      }

      resolve(output);
    });
  });
}

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.set('Content-Type', 'text/plain');
  let body = 'This is the list of our students\n';

  countStudents(database)
    .then((output) => {
      body += output;
      res.send(body);
    })
    .catch((error) => {
      body += error.message;
      res.send(body);
    });
});

app.listen(1245);

module.exports = app;
