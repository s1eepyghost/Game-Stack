import React from 'react';
import { Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SELF } from '../utils/queries';
import { DELETE_GAME } from '../utils/mutations';
import { REMOVE_PLATFORM } from '../utils/mutations';

function Profile() {
    const { loading, data } = useQuery(GET_SELF);

    const [deleteGame, { error }] = useMutation(DELETE_GAME);
    const [removePlatform, { error2 }] = useMutation(REMOVE_PLATFORM);

    const userData = data?.self || {};

    const handleDeleteGame = async (gameId) => {
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

    const handleRemovePlatform = async (platformId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await removePlatform({ variables: {platformId: platformId}});
        }
        catch (err) {
            console.error(err);
        }
    }

    if (loading) {
        return <h2>Grabbing data...</h2>;
    }
    return (
        <>
            <h1>Your Game Stack</h1>
            <br />
            <Container>
                <Button
                    className='btn-block btn-info'
                    onClick={() => navigator.clipboard.writeText(window.location.origin + '/profile/' + userData._id)}
                >
                    Copy URL to this stack
                </Button>
            </Container>
            <br />
            <h2>Platforms</h2>
            <Container>
                <CardColumns>
                    {userData.savedPlatforms.map((plat) => {
                        return (
                            <Card key={plat.platformId} border='dark'>
                                <Card.Body>
                                    <Card.Title>{plat.name}</Card.Title>
                                    <Button className='btn-block btn-danger' onClick={() => handleRemovePlatform(plat.platformId)}>
                                        Remove this platform
                                    </Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </CardColumns>
            </Container>
            <br />
            <h2>Games</h2>
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