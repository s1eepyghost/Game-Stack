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

export const QUERY_MATCHUPS = gql`
    query matchups($query: String!) {
        matchups(query: $query) {
            name
            released
            background_image
        }
    }
`;

export const QUERY_TOP50 = gql`
    query top50 {
        top50 {
            name
            released
            background_image
        }
    }
`;