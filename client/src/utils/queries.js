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

// export const QUERY_MATCHUPS = gql`
//     query matchups($_id: String) {
//         matchups(_id: $_id) {

//         }
//     }
// `;