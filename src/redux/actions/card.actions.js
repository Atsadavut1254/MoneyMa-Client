import axios from 'axios';
import { cardConstants } from '../constants/cardConstants';
// import { loadingActions } from '../actions/loading.action';

export const createCard = (data) => async (dispatch) => {
    // console.log(data);
    try {
        // dispatch(loadingActions.startLoading());
        dispatch({
            type: cardConstants.START_LOADING
        });

        const result = await axios.post('/card/', data);
        dispatch({
            type: cardConstants.CREATE_EVENT_SUCCESS,
            payload: {
                data: result.data.data.cardId
            }
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: cardConstants.CREATE_EVENT_FAILED
        });
    } finally {
        dispatch({
            type: cardConstants.STOP_LOADING
        });
    }
};

export const updateCard = (data, id) => async (dispatch) => {
    try {
        dispatch({
            type: cardConstants.START_LOADING
        });
        const result = await axios.patch(`/card/${id}`, data);
        dispatch({
            type: cardConstants.UPDATECARD_SUCCESS,
            payload: {
                data: result.data.data.cardId
            }
        });
        window.history.back();
    } catch (err) {
        console.log(err);
        dispatch({
            type: cardConstants.UPDATECARD_FAILED
        });
    } finally {
        dispatch({
            type: cardConstants.STOP_LOADING
        });
    }
};

export const getCardList = () => async (dispatch) => {
    try {
        dispatch({
            type: cardConstants.START_LOADING
        });
        axios.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${localStorage.getItem('token')}`;
        const result = await axios.get('/card/');

        dispatch({
            type: cardConstants.GETCARDLIST_SUCCESS,
            payload: {
                data: result.data.data
            }
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: cardConstants.GETCARDLIST_FAILED
        });
    } finally {
        dispatch({
            type: cardConstants.STOP_LOADING
        });
    }
};

export const getCardbyId = (cardId) => async (dispatch) => {
    try {
        dispatch({
            type: cardConstants.START_LOADING
        });

        const result = await axios.get(`/card/${cardId}`);
        dispatch({
            type: cardConstants.GETCARDID_SUCCESS,
            payload: {
                data: result.data.data
            }
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: cardConstants.GETCARDID_FAILED
        });
    } finally {
        dispatch({
            type: cardConstants.STOP_LOADING
        });
    }
};

export const getGreeting = (cardId) => async (dispatch) => {
    try {
        dispatch({
            type: cardConstants.START_LOADING
        });
        const result = await axios.get(`/card/${cardId}/song/guest`);
        dispatch({
            type: cardConstants.GETGREETING_SUCCESS,
            payload: {
                data: result.data.data
            }
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: cardConstants.GETGREETING_FAILED
        });
    } finally {
        dispatch({
            type: cardConstants.STOP_LOADING
        });
    }
};

export const getStatustrue = (cardId, status) => async (dispatch) => {
    try {
        dispatch({
            type: cardConstants.START_LOADING
        });
        const result = await axios.get(`/card/${cardId}/song/guest`, {
            params: {
                status: status,
                cardId: cardId
            }
        });
        // console.log('------------');
        // console.log(JSON.stringify(result.data.data.guests.guest));
        // console.log(cardId, status);
        dispatch({
            type: cardConstants.GETSTATUSGUEST_SUCCESS,
            payload: {
                data: {
                    type: status ? 'acceptGuests' : 'cancelGuests',
                    data: result.data.data.guests
                }
            }
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: cardConstants.GETSTATUSGUEST_FAILED
        });
    } finally {
        dispatch({
            type: cardConstants.STOP_LOADING
        });
    }
};

export const createCost = (data, cardId) => async (dispatch) => {
    try {
        dispatch({
            type: cardConstants.START_LOADING
        });
        const result = await axios.post(`/card/${cardId}/create-cost`, data);
        dispatch({
            type: cardConstants.CREATECOST_SUCCESS,
            payload: {
                data: result.data.data.cardId
            }
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: cardConstants.CREATECOST_FAILED
        });
    } finally {
        dispatch({
            type: cardConstants.STOP_LOADING
        });
        dispatch(getCost(cardId));
    }
};

export const getCost = (cardId) => async (dispatch) => {
    try {
        dispatch({
            type: cardConstants.START_LOADING
        });
        const result = await axios.get(`/card/${cardId}/cost`);
        dispatch({
            type: cardConstants.GETLISTCOST_SUCCESS,
            payload: {
                data: result.data.data
            }
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: cardConstants.GETLISTCOST_FAILED
        });
    } finally {
        dispatch({
            type: cardConstants.STOP_LOADING
        });
    }
};

export const deleteCost = (cardId, budgetId) => async (dispatch) => {
    try {
        dispatch({
            type: cardConstants.START_LOADING
        });
        const result = await axios.patch(
            `/card/${cardId}/delete-cost/${budgetId}`
        );
        dispatch({
            type: cardConstants.DELETECOST_SUCCESS
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: cardConstants.DELETECOST_FAILED
        });
    } finally {
        dispatch({
            type: cardConstants.STOP_LOADING
        });
        dispatch(getCost(cardId));
        // window.location.reload();
    }
};

export const closeEvent = (cardId) => async (dispatch) => {
    try {
        dispatch({
            type: cardConstants.START_LOADING
        });
        const result = await axios.patch(`/card/${cardId}/close-card/card`);
        dispatch({
            type: cardConstants.CLOSE_EVENT_SUCCESS,
            payload: {
                data: result.data.data
            }
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: cardConstants.CLOSE_EVENT_FAILED
        });
    } finally {
        dispatch({
            type: cardConstants.STOP_LOADING
        });
        window.location.reload();
    }
};
