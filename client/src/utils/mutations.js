import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_GAME = gql`
    mutation saveGame($input: saveGameParams!) {
        saveGame(input: $input) {
            _id
            username
            email
            gameCount
            savedGames {
                gameId
                developers
                description
                title
                image
                platforms
            }
            savedPlatforms {
                platformId
                name
            }
        }
    }
`;

export const DELETE_GAME = gql`
    mutation deleteGame($gameId: Int!) {
        deleteGame(gameId: $gameId) {
            _id
            username
            email
            gameCount
            savedGames {
                gameId
                developers
                description
                title
                image
                platforms
            }
            savedPlatforms {
                platformId
                name
            }
        }
    }
`;

export const ADD_PLATFORM = gql`
    mutation addPlatform($input: addPlatformParams!) {
        addPlatform(input: $input) {
            _id
            username
            email
            gameCount
            savedGames {
                gameId
                developers
                description
                title
                image
                platforms
            }
            savedPlatforms {
                platformId
                name
            }          
        }
    }
`;

export const REMOVE_PLATFORM = gql`
    mutation removePlatform($name: String!) {
        removePlatform(name: $name) {
            _id
            username
            email
            gameCount
            savedGames {
                gameId
                developers
                description
                title
                image
                platforms
            }
            savedPlatforms {
                platformId
                name
            }            
        }
    }
`;