import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SELF } from '../utils/queries';
import { DELETE_GAME } from '../utils/mutations';

function Profile() {
    const { loading, data } = useQuery(GET_SELF);
    const userData = data?.self || {};
    return (
        <>
            <h1>Your Game Stack</h1>
            <br />
            <br />
        </>
    )
}

export default Profile