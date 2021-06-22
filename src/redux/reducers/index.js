import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cardReducer from './cardReducer';
import songReducer from './songReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    card: cardReducer,
    song: songReducer,
    load: loadingReducer
});

export default rootReducer;
