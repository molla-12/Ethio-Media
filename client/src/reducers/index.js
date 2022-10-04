import { combineReducers } from "redux";

import posts from './posts';
import auth from './auth';
import error from './error';

export default combineReducers({ posts, auth, error });
