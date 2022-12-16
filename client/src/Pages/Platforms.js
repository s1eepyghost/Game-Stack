import React, { useState } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchRAWGPlatforms } from '../utils/API';

import { useMutation } from '@apollo/client';
import { ADD_PLATFORM } from '../utils/mutations';

const Platforms = () => {
    const [searchedPlatforms, setSearchedPlatforms] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [addPlatform, { error }] = useMutation(ADD_PLATFORM);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await searchRAWGPlatforms(searchInput);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const items = await response.json();

            console.log(items);

            const platData = items.results;
            console.log(platData);

            setSearchedPlatforms(platData);
            setSearchInput('');
        }
        catch (err) {
            console.error(err);
        }
    }

    const handlePlatformSave = async (platId) => {
        const platToSave = searchedPlatforms.find((plat) => plat.id === platId);
        console.log(platToSave);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await addPlatform({
                variables: {
                    input: {
                        platformId: platToSave.id,
                        name: platToSave.name
                    }
                }
            });
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h1>Platforms</h1>
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
                                    placeholder='Search for a platform'
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
                    {searchedPlatforms.map((platform) => {
                        return (
                            <Card key={platform.id} border='dark'>
                                {platform.background_image ? (
                                    <Card.Img src={platform.background_image} alt={`An image of a ${platform.name}`} variant='top' style={{ objectFit: 'cover' }}/>
                                ) : null }
                                <Card.Body>
                                    <Card.Title>{platform.name}</Card.Title>
                                    {Auth.loggedIn() ? (
                                        <Button
                                            className='btn-block btn-info'
                                            onClick={() => handlePlatformSave(platform.id)}
                                        >
                                            Add a copy of this platform to your stack
                                        </Button>
                                    ) : null }
                                </Card.Body>
                            </Card>
                        )
                    })}
                </CardColumns>
            </Container>

        </>
    )
}

export default Platforms