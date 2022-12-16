const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        self: User
        user(userId: ID!): User
        users: [User]
        search(query: String!): [Game]
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        gameCount: Int
        savedGames: [Game]
        savedPlatforms: [Platform]
    }

    type Platform {
        _id: ID!
        name: String!
        platformId: Int
    }

    type Game {
        gameId: Int
        developers: [String]
        description: String
        title: String
        image: String
        platforms: [String]
    }

    type APIgame {
        name: String
        released: String
        background_image: String
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
        addPlatform(input: addPlatformParams): User
        removePlatform(platformId: Int!): User
    }

    input saveGameParams {
        description: String
        title: String
        gameId: Int
        image: String
        developers: [String]
        platforms: [String]
    }

    input addPlatformParams {
        platformId: Int
        name: String
    }
`;

module.exports = typeDefs;