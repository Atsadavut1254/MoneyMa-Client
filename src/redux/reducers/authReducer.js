import { authConstants } from '../constants/authConstants';

const initialState = {
    token: localStorage.getItem('token'),
    loading: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authConstants.START_LOADING:
            return {
                ...state,
                loading: true
            };
        case authConstants.STOP_LOADING:
            return {
                ...state,
                loading: false
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.data
            };
        case authConstants.LOGIN_FAILED:
            return {
                ...state,
                token: null
            };
        default:
            return state;
    }
};

export default authReducer;
