const fs = require('fs').promises; // Importe les fonctions promises de fs

async function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8')
      .then((data) => {
        // Divise le contenu en lignes, puis filtre les lignes vides
        const lines = data
          .split('\n')
          .filter((line) => line.trim() !== '');

        // La première ligne contient les en-têtes, on la retire pour ne garder que les données
        const students = lines.slice(1);

        // Compte le nombre total d'étudiants
        const totalStudents = students.length;
        console.log(`Number of students: ${totalStudents}`);

        // Crée un objet pour stocker le nombre d'étudiants par domaine et la liste de leurs prénoms
        const fieldCounts = {};

        // Parcours chaque étudiant
        for (const student of students) {
          const [firstname, , , field] = student.split(','); // Extrait le prénom et le domaine

          // Si le domaine n'existe pas, l'initialise
          if (!fieldCounts[field]) {
            fieldCounts[field] = { count: 0, students: [] };
          }

          // Incrémente le compteur et ajoute le prénom à la liste
          fieldCounts[field].count += 1;
          fieldCounts[field].students.push(firstname);
        }

        // Affiche le nombre d'étudiants et la liste des prénoms pour chaque domaine
        for (const field in fieldCounts) {
          if (Object.prototype.hasOwnProperty.call(fieldCounts, field)) {
            console.log(
              `Number of students in ${field}: ${fieldCounts[field].count}. List: ${fieldCounts[field].students.join(', ')}`,
            );
          }
        }

        resolve(); // Résout la promesse une fois que tout est terminé
      })
      .catch(() => {
        reject(new Error('Cannot load the database')); // Rejette la promesse en cas d'erreur
      });
  });
}

module.exports = countStudents;