const http = require('http');
const fs = require('fs');

const args = process.argv.slice(2);
const database = args[0];

function countStudents(path) {
    return new Promise((resolve, reject) => {
        fs.readfile(path, 'utf-8', (err, data) => {
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

            console.log(`Number of students: ${students.length}`);

            for (const field in fields) {
                const list = fields[field];
                console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
            }

            resolve();
        });
    });
}

const app = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    if (req.url === '/') {
        res.end('Hello Holberton School!');
    } else if (req.url === '/students') {
        res.write('This is the list of our students\n');
        countStudents(database)
        .then((output) => {
            res.end(output);
        })
        .catch((error) => {
            res.end(error.message);
        });
    } else {
        res.end();
    }
});

app.listen(1245);

module.exports = app;
