import { gql } from '@apollo/client';

export const GET_SELF = gql`
    query self {
        self {
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

export const GET_USER = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
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
`

export const QUERY_TOP50 = gql`
    query top50 {
        top50 {
            name
            released
            background_image
        }
    }
`;
