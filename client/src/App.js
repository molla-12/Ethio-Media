import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'

import { getPosts } from './actions/posts';

import useStyles from './styles';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Container maxWidth="lg">
            <AppBar className={ classes.appBar } position="static" color="inherit">
                <Typography className={ classes.heading } variant="h2" align="center">MERN STACK</Typography>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={ 4 }>
                        <Grid item xs={ 12 } sm={ 7 }>
                            <Posts setCurrentId={ setCurrentId } />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 4 }>
                            <Form currentId={ currentId } setCurrentId={ setCurrentId } />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;
