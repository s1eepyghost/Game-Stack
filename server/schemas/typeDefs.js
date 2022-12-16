const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        self: User
        user(userId: ID!): User
        users: [User]
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        gameCount: Int
        savedGames: [Game]
        savedPlatforms: [String]
    }

    type Game {
        gameId: Int!
        developers: [String]
        description: String
        title: String
        image: String
        platforms: [String]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        testAddUser(username: String!, email: String!, password: String!): User
        saveGame(input: saveGameParams): User
        deleteGame(gameId: Int!): User
        addPlatform(name: String): User
        removePlatform(name: String): User
        testRemoveGame(userId: ID!, gameId: Int!): User
    }

    input saveGameParams {
        description: String
        title: String
        gameId: Int
        image: String
        developers: [String]
        platforms: [String]
    }
`;

module.exports = typeDefs;