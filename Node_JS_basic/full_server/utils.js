const fs = require('fs');

function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const fields = {};
      const students = data.split('\n').filter((student) => student.trim() !== '');
      if (students.length === 0) {
        reject(new Error('Cannot load the database'));
        return;
      }

      students.shift();

      students.forEach((student) => {
        const studentInfo = student.split(',');
        if (!fields[studentInfo[3]]) {
          fields[studentInfo[3]] = [];
        }
        fields[studentInfo[3]].push(studentInfo[0]);
      });

      resolve(fields);
    });
  });
}

module.exports = readDatabase;