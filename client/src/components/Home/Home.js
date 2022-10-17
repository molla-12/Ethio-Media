import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from '../Pagination';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const navigate = useNavigate();
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [currentId, dispatch]);

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);

        } else {
            navigate('/');
        }
    };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justify="space-between" alignItems="stretch" spacing={ 3 } className={ classes.gridContainer }>
                    <Grid item xs={ 12 } sm={ 6 } md={ 9 }>
                        <Posts setCurrentId={ setCurrentId } />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
                        <AppBar className={ classes.appBarSearch } position="static" color="inherit">
                            <TextField name="search" variant="outlined" label="search" fullWidth value={ search } onChange={ (e) => setSearch(e.target.value) } onKeyDown={ handleKeyPress }/>
                            <ChipInput margin='dense' variant="outlined" value={ tags } onAdd={ (chip) => handleAddChip(chip) } onDelete={ (chip) => handleDeleteChip(chip) } label="Search by Tags" />
                            <Button style={ { marginTop: '5px' } } className={ classes.searchButton } variant="contained" color="primary" onClick={ searchPost }>Search</Button>
                        </AppBar>
                        <Form currentId={ currentId } setCurrentId={ setCurrentId } />
                        { (!searchQuery && !tags.length) && (
                            <Paper elevation="3" className={ classes.pagination }>
                                <Paginate page={ page } />
                            </Paper>
                        ) }
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;
