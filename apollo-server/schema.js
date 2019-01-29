'use strict'

const { gql } = require('apollo-server-express')

const SomeSchema = require('./SomeSchema')

const resolvers = require('../resolvers')

const rootQuery = gql`
  type Subscription {
    subscriptionExample: SomeSchema
  }

  type Query {
  }

  type Mutation {
  }
`

module.exports = {
  typeDefs: [rootQuery, SomeSchema],
  resolvers
}