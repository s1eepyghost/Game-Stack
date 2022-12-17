import React from 'react';
import { Container, CardColumns, Card } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';

function OtherProfile() {
    const { loading, data } = useQuery(GET_USER, {
        variables: { userId: window.location.href.toString().trim().split('/')[4]}
    });
    
    // const { loading2, userId } = useQuery(GET_OWN_ID);
    console.log(data);
    const userData = data?.user || {};
    console.log(userData);


    if (loading) {
        return <h2>Grabbing data...</h2>;
    }
    return (
        <>
            <h1>{userData.username}'s Game Stack</h1>
            <br />
            <Container>
                <CardColumns>
                    {userData.savedPlatforms.map((plat) => {
                        return (
                            <Card key={plat.platformId} border='dark'>
                                <Card.Body>
                                    <Card.Title>{plat.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </CardColumns>
            </Container>
            <br />
            <Container>
                <CardColumns>
                    {userData.savedGames.map((game) => {
                        return (
                            <Card key={game.gameId} border='dark'>
                                {game.image ? <Card.Img src={game.image} alt={`The cover for ${game.name}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{game.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    )
}
export default OtherProfile