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
            savedPlatforms
        }
    }
`;