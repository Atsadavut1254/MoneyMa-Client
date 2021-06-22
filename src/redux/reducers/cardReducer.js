import { cardConstants } from '../constants/cardConstants';

const initialState = {
    cards: null,
    cardId: null,
    card: null,
    loading: false,
    acceptGuests: null,
    cancelGuests: null,
    cost: null
};

const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case cardConstants.START_LOADING:
            return {
                ...state,
                loading: true
            };
        case cardConstants.STOP_LOADING:
            return {
                ...state,
                loading: false
            };
        case cardConstants.CREATE_EVENT_SUCCESS:
            return {
                ...state,
                cardId: action.payload.data
            };
        case cardConstants.CREATE_EVENT_FAILED:
            return {
                ...state,
                cardId: null
            };
        case cardConstants.UPDATECARD_SUCCESS:
            return {
                ...state,
                cardId: action.payload.data
            };
        case cardConstants.UPDATECARD_FAILED:
            return {
                ...state,
                cardId: null
            };
        case cardConstants.GETCARDLIST_SUCCESS:
            return {
                ...state,
                cards: action.payload.data
            };
        case cardConstants.GETCARDLIST_FAILED:
            return {
                ...state,
                cards: null
            };
        case cardConstants.GETCARDID_SUCCESS:
            return {
                ...state,
                card: action.payload.data
            };
        case cardConstants.GETCARDID_FAILED:
            return {
                ...state,
                card: null
            };
        case cardConstants.GETGREETING_SUCCESS:
            return {
                ...state,
                card: action.payload.data
            };
        case cardConstants.GETGREETING_FAILED:
            return {
                ...state,
                card: null
            };
        case cardConstants.GETSTATUSGUEST_SUCCESS:
            return {
                ...state,
                [action.payload?.data.type]: action.payload?.data.data
            };
        case cardConstants.GETSTATUSGUEST_FAILED:
            return {
                ...state,
                card: null
            };
        case cardConstants.CREATECOST_SUCCESS:
            return {
                ...state,
                cost: action.payload.data
            };
        case cardConstants.CREATECOST_FAILED:
            return {
                ...state,
                cost: null
            };
        case cardConstants.DELETECOST_SUCCESS:
            return {
                ...state,
                cost: action.payload.data
            };
        case cardConstants.DELETECOST_FAILED:
            return {
                ...state,
                cost: null
            };
        case cardConstants.GETLISTCOST_SUCCESS:
            return {
                ...state,
                cost: action.payload.data
            };
        case cardConstants.GETLISTCOST_FAILED:
            return {
                ...state,
                cost: null
            };
        case cardConstants.CLOSE_EVENT_SUCCESS:
            return {
                ...state,
                cardId: action.payload.data
            };
        case cardConstants.CLOSE_EVENT_FAILED:
            return {
                ...state,
                cardId: null
            };
        default:
            return state;
    }
};

export default cardReducer;
