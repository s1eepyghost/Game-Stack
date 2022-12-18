/* Sends a query to the RAWG database to search for games using a search term.
Todo: should maybe limit how many to search for?
Todo: Also figure out how to secretly send API keys to these functions
*/

export const searchRAWG = (query) => {
    return fetch(`https://api.rawg.io/api/games?key=385e31d0dc754439817581587a08cf36&search=${query}`);
}

/*
    Sends a search query to RAWG to get any game platforms it recognizes.
*/
export const searchRAWGPlatforms = (query) => {
    return fetch(`https://api.rawg.io/api/platforms?key=385e31d0dc754439817581587a08cf36&search=${query}`);
}