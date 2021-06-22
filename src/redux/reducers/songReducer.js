import { songConstants } from '../constants/songConstants';

const initialState = {
    song: null,
    songId: null,
    loading: false,
    deeplink: null
};

const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case songConstants.START_LOADING:
            return {
                ...state,
                loading: true
            };
        case songConstants.STOP_LOADING:
            return {
                ...state,
                loading: false
            };
        case songConstants.GETSONG_SUCCESS:
            return {
                ...state,
                song: action.payload.data
            };
        case songConstants.GETSONG_FAILED:
            return {
                ...state,
                song: null
            };
        case songConstants.CREATESONG_SUCCESS:
            return {
                ...state,
                songId: action.payload.data.songId,
                deeplink: action.payload.data.deepLink
            };
        case songConstants.CREATESONG_FAILED:
            return {
                ...state,
                songId: null
            };
        case songConstants.GET_SONG_BYID_SUCCESS:
            return {
                ...state,
                song: action.payload.data
            };
        case songConstants.GET_SONG_BYID_FAILED:
            return {
                ...state,
                song: null
            };
        default:
            return state;
    }
};

export default songReducer;
