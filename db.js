const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE characters (name TEXT, movie TEXT)');
  
  // Datos iniciales
  const stmt = db.prepare('INSERT INTO characters VALUES (?, ?)');
  stmt.run('Luke Skywalker', 'Star Wars');
  stmt.run('Frodo Baggins', 'The Lord of the Rings');
  stmt.finalize();
});

module.exports = db;
