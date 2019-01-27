const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const casual = require('casual')

const books = [{
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
]

const typeDefs = gql `
  type Book {
    title: String
    author: String
  }
  type Tag {
    id: Int
    label: String
  }

  type Mutation {
    addTag(label: String!): Tag
  }
  type Query {
    books: [Book]
    ping(message: String!): String
    tags: [Tag]
  }
`

// 生成一些标签
var id = 0
var tags = []
for (let i = 0; i < 5; i++) {
  addTag(casual.word)
}

function addTag(label) {
  let t = {
    id: id++,
    label
  }
  tags.push(t)
  return t
}
const resolvers = {
  Query: {
    books: () => books,
    ping(root, { message }, context) {
      return `Answering ${message}`
    },
    tags(root, args, context) {
      return tags
    }
  },
  Mutation: {
    addTag(root, { label }, context) {
      return addTag(label)
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
server.applyMiddleware({ app })

const port = 4000

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
)