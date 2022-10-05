import * as api from '../api';
import { CREATE, UPDATE, DELETE, FEATCH_ALL, FEATCH_SEARCH } from '../constants/actionTypes';

export const getPosts = (page) => async (dispatch) => {
    try {
        const { data } = await api.getPosts(page);

        dispatch({ type: FEATCH_ALL, payload: data });
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
    //dispatch(action);
    // const action = { type: 'FEATCH_ALL', payload: [] }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data: { data } } = await api.featchPostsBySearch(searchQuery);

        dispatch({ type: FEATCH_SEARCH, payload: { data } });
    } catch (error) {
        console.log(error.message);

    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });

    } catch (error) {
        console.log(error.message);

    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });

    } catch (error) {
        console.log(error.message);

    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });

    } catch (error) {
        console.log(error.message);

    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: UPDATE, payload: data });

    } catch (error) {
        console.log(error.message);

    }
}
