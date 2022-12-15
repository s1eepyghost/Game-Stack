import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchGoogleBooks } from '../utils/API';

import { SAVE_GAME } from '../utils/mutations';

const SearchGames = () => {
    const [searchedGames, setSearchedBooks] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const [saveGame, { error }] = useMutation(SAVE_BOOK);
}

function Games() {
    // Todo: have initial API query of the top games from RAWG? May also need to add a Search form on this page.
    return (
        <>
            <h1>Games</h1>
            <br />
            <br />
        </>
    )
}

export default Games