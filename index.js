const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('./schema');

// Crear la instancia del servidor
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Iniciar el servidor
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
