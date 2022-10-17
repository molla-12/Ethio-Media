import { CREATE, UPDATE, DELETE, FEATCH_ALL, FEATCH_ONE, FEATCH_SEARCH, START_LOADING, COMMENT,END_LOADING } from '../constants/actionTypes';

const reducer = (state = { isLoading: true, posts: [], post:[] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FEATCH_ALL:
            return { ...state, posts: action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages };
        case FEATCH_ONE:
            return { ...state, post: action.payload.post };
        case FEATCH_SEARCH:
            return { ...state, posts: action.payload.data }; 

        case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === +action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };
        case CREATE:
            return [...state, action.payload];
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => (post._id === action.payload._id)) };
        default:
            return state;
    }
}

export default reducer;
