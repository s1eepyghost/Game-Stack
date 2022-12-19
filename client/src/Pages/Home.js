import React from "react"
import { QUERY_TOP50 } from '../utils/queries';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { useQuery } from "@apollo/client";


function Home() {
    const  { data } = useQuery(QUERY_TOP50);

    return (
        <>
            <h1>Home</h1>
            <br />
            <br />
            <h3>Show off the games that you own, and compare with others's.</h3>
            <br />
            <Container>
                <CardColumns>
                    {data?.top50?.map((game) => {
                        return (
                            <Card key={game.id} border='dark'>
                                {game.background_image ? (
                                    <Card.Img src={game.background_image} alt={`The cover for ${game.name}`} variant='top' style={{ objectFit: 'cover' }}/>
                                ) : null }
                                <Card.Body>
                                    <Card.Title>{game.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </CardColumns>
            </Container>

        </>
    )
}

export default Home