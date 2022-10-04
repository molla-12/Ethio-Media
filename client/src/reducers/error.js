import { ERROR } from '../constants/actionTypes';

const errorReducer = (state = { error: null }, action) => {
    switch (action.type) {
        case ERROR:
            return { ...state, error: action?.payload };
        default:
            return state;
    }
}

export default errorReducer;

