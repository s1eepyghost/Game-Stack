import React, { useState } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchRAWG } from '../utils/API';

import { useMutation } from '@apollo/client';
import { SAVE_GAME } from '../utils/mutations';

const Games = () => {
    const [searchedGames, setSearchedGames] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const [saveGame, { error }] = useMutation(SAVE_GAME);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("Got search input: ", searchInput);

        if (!searchInput) {
            return false;
        }

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
                                    <Card.Img src={game.background_image} alt={`The cover for ${game.name}`} variant='top'/>
                                ) : null }
                            </Card>
                        )
                    })}
                </CardColumns>
            </Container>


            {/* {userData.map((data, id) => {
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
            })} */}
        </>
    )
}

export default Games