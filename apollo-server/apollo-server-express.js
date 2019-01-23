const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const books = [{
  title: 'Harry Potter and the Chamber of Secrets',
  author: 'J.K. Rowling',
},
{
  title: 'Jurassic Park',
  author: 'Michael Crichton',
},
];
const typeDefs = gql `
type Book {
  title: String
  author: String
}
type Query {
  books: [Book]
  hello: String
}
`;

const resolvers = {
Query: {
  books: () => books,
},
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);