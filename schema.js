const { gql } = require('apollo-server');
const db = require('./db');

// Definir el esquema
const typeDefs = gql`
  type Character {
    name: String
    movie: String
  }

  type Query {
    characters: [Character]
    character(name: String!): Character
  }

  type Mutation {
    addCharacter(name: String!, movie: String!): Character
    updateCharacter(name: String!, movie: String!): Character
    deleteCharacter(name: String!): String
  }
`;

// Resolvers
const resolvers = {
  Query: {
    characters: () => {
      return new Promise((resolve, reject) => {
        db.all('SELECT * FROM characters', (err, rows) => {
          if (err) {
            reject([]);
          }
          resolve(rows);
        });
      });
    },
    character: (_, { name }) => {
      return new Promise((resolve, reject) => {
        db.get('SELECT * FROM characters WHERE name = ?', [name], (err, row) => {
          if (err) {
            reject(null);
          }
          resolve(row);
        });
      });
    },
  },
  Mutation: {
    addCharacter: (_, { name, movie }) => {
      return new Promise((resolve, reject) => {
        db.run('INSERT INTO characters (name, movie) VALUES (?, ?)', [name, movie], function (err) {
          if (err) {
            reject(null);
          }
          resolve({ name, movie });
        });
      });
    },
    updateCharacter: (_, { name, movie }) => {
      return new Promise((resolve, reject) => {
        db.run('UPDATE characters SET movie = ? WHERE name = ?', [movie, name], function (err) {
          if (err) {
            reject(null);
          }
          resolve({ name, movie });
        });
      });
    },
    deleteCharacter: (_, { name }) => {
      return new Promise((resolve, reject) => {
        db.run('DELETE FROM characters WHERE name = ?', [name], function (err) {
          if (err) {
            reject('Error deleting character');
          }
          resolve('Character deleted successfully');
        });
      });
    },
  },
};

module.exports = { typeDefs, resolvers };
