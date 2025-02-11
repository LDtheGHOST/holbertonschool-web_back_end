const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(request, response) {
    try {
      readDatabase(process.argv[2])
        .then((fields) => {
          let responseText = 'This is the list of our students\n';
          const responseFields = [];
          for (const i of Object.keys(fields)) {
            responseFields.push(`Number of students in ${i}: ${fields[i].length}. List: ${fields[i].join(', ')}`);
          }
          responseText += responseFields.join('\n');
          response.status(200).send(responseText);
        });
    } catch (_error) {
      response.status(500).send('Cannot load the database');
    }
  }

  static getAllStudentsByMajor(request, response) {
    try {
      readDatabase(process.argv[2])
        .then((fields) => {
          const { major } = request.params;
          if (fields[major]) {
            response.status(200).send(`List: ${fields[major].join(', ')}`);
          } else {
            response.status(500).send('Major parameter must be CS or SWE');
          }
        });
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;