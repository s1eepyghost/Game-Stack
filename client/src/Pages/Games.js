import React, { useState } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchRAWG } from '../utils/API';

import { useLazyQuery, useMutation } from '@apollo/client';
import { SAVE_GAME } from '../utils/mutations';

const Games = () => {
    // const [getGames, { loading, data }] = useLazyQuery(QUERY_MATCHUPS);

    const [searchInput, setSearchInput] = useState('');

    const [searchedGames, setSearchedGames] = useState([]) ;

    const [saveGame, { error }] = useMutation(SAVE_GAME);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("Got search input: ", searchInput);

        if (!searchInput) {
            return false;
        }
        // getGames({ variables: {query: searchInput} })
        try {
            const response = await searchRAWG(searchInput);
            if (!response.ok) {
                throw new Error('something went wrong!');
            }
            const items = await response.json();
            console.log(items);
            
            const gameData = items.results;
            console.log(gameData);
            setSearchedGames(gameData);
            setSearchInput('');
        }
        catch (err) {
            console.error(err);
        }
    }

    const handleGameSave = async (gameId) => {
        const gameToSave = searchedGames.find((game) => game.id === gameId);
        console.log('gameToSave: ', gameToSave);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        try {
            await saveGame({
                variables: {
                    input: {
                        description: 'placeholder',
                        title: gameToSave.name,
                        gameId: gameToSave.id,
                        image: gameToSave.background_image,
                        developers: [''],
                        platforms: ['']
                    }
                }
            });
        }
        catch(err) {
            console.error(err);
        }
    }
    // Todo: have initial API query of the top games from RAWG? May also need to add a Search form on this page.
    return (
        <>
            <h1>Games</h1>
            <br />
            <br />
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h2>Search Field:</h2>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                    name='searchInput'
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type='text'
                                    size='lg'
                                    placeholder='Search for a game'
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button type='submit' variant='success' size='lg'>
                                    Submit Search
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </Jumbotron>

            <Container>
                <CardColumns>
                    {searchedGames.map((game) => {
                        return (
                            <Card key={game.id} border='dark'>
                                {game.background_image ? (
                                    <Card.Img src={game.background_image} alt={`The cover for ${game.name}`} variant='top' style={{ objectFit: 'cover' }}/>
                                ) : null }
                                <Card.Body>
                                    <Card.Title>{game.name}</Card.Title>
                                    <Button>
                                        Add this game, eventually
                                    </Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </CardColumns>
            </Container>

        </>
    )
}

export default Games