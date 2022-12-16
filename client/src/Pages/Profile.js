import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SELF } from '../utils/queries';
import { DELETE_GAME } from '../utils/mutations';
import { REMOVE_PLATFORM } from '../utils/mutations';

function Profile() {
    const { loading, data } = useQuery(GET_SELF);
    console.log(data);
    const userData = data?.self || {};
    console.log(userData);

    const [deleteGame, { error }] = useMutation(DELETE_GAME);
    const [removePlatform, { error2 }] = useMutation(REMOVE_PLATFORM);

    const handleDeleteGame = async (gameId) => {
        console.log("gameId to remove: ", gameId)
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await deleteGame({ variables: {gameId: gameId }});


        }
        catch (err) {
            console.error(err);
        }
    };

    // const handleRemovePlatofrm = async (platformId) => {

    // }

    if (loading) {
        return <h2>Grabbing data...</h2>;
    }
    return (
        <>
            <h1>Your Game Stack</h1>
            <br />
            <br />
            <Container>
                <CardColumns>
                    {userData.savedGames.map((game) => {
                        return (
                            <Card key={game.gameId} border='dark'>
                                {game.image ? <Card.Img src={game.image} alt={`The cover for ${game.name}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{game.title}</Card.Title>
                                    {/* <Card.Text>{game.description}</Card.Text> */}
                                    <Button className='btn-block btn-danger' onClick={() => handleDeleteGame(game.gameId)}>
                                        Remove this game
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    )
}
export default Profile