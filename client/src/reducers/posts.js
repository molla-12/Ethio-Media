import { CREATE, UPDATE, DELETE, FEATCH_ALL, FEATCH_SEARCH } from '../constants/actionTypes';

const reducer = (state = [], action) => {
    switch (action.type) {
        case FEATCH_ALL:
            return { ...state, posts: action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages };
        case FEATCH_SEARCH:
            return { ...state, posts: action.payload };
        case CREATE:
            return [...state, action.payload];
        case UPDATE:
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
            return state.filter((post) => post._id === action.payload._id);
        default:
            return state;
    }
}

export default reducer;
