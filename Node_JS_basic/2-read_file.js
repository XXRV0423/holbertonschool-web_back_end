const fs = require('fs');

function countStudents(path) {
  let data;
  try {
    data = fs.readFileSync(path, 'utf-8');
  } catch (err) {
    throw new Error('Cannot load the database');
  }

  const lines = data.split('\n').filter((line) => line.trim() !== '');
  // first line is the header
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

  console.log(`Number of students: ${students.length}`);

  for (const field in fields) {
    const list = fields[field];
    console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
  }
}

module.exports = countStudents;
