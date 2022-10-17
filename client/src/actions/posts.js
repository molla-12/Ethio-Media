import * as api from '../api';
import { CREATE, UPDATE, DELETE, FEATCH_ALL, FEATCH_SEARCH, START_LOADING, END_LOADING, FEATCH_ONE,COMMENT } from '../constants/actionTypes';

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.getPost(id);

        dispatch({ type: FEATCH_ONE, payload: { post: data } });
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error);
    }
};

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getPosts(page);

        dispatch({ type: FEATCH_ALL, payload: data });
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error.message);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data: { data } } = await api.featchPostsBySearch(searchQuery);

        dispatch({ type: FEATCH_SEARCH, payload: { data } });
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error.message);
    }
};


export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error.message);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });

    } catch (error) {
        console.log(error.message);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });

    } catch (error) {
        console.log(error.message);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: UPDATE, payload: data });

    } catch (error) {
        console.log(error.message);
    }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
