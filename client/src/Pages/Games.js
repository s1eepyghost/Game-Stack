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

            

        {userData.map((data,id)=>{
            return <div class="card-group">
                <div class="card">
                    <img class="card-img-top" src="..." alt="Card image cap" />
                    <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div> 
    })}
        </>
    )
}

export default Games