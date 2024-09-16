const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('./schema');

// Crear la instancia del servidor
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,  // Habilitar introspección en producción
  playground: true      // Habilitar el Playground en producción
});

// Usar el puerto proporcionado por Render o 4000 en local
const port = process.env.PORT || 4000;

// Iniciar el servidor
server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
