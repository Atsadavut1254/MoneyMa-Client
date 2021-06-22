import axios from 'axios';
import { songConstants } from '../constants/songConstants';

export const getListSong = () => async (dispatch) => {
    try {
        dispatch({
            type: songConstants.START_LOADING
        });

        const result = await axios.get('/guest/');

        dispatch({
            type: songConstants.GETSONG_SUCCESS,
            payload: {
                data: result.data.data
            }
        });
    } catch (err) {
        dispatch({
            type: songConstants.GETSONG_FAILED
        });
    } finally {
        dispatch({
            type: songConstants.STOP_LOADING
        });
    }
};

export const createSong = (data, cardId) => async (dispatch) => {
    try {
        dispatch({
            type: songConstants.START_LOADING
        });

        const result = await axios.post(`/song/${cardId}`, data);
        dispatch({
            type: songConstants.CREATESONG_SUCCESS,
            payload: {
                data: result.data.data
            }
        });
    } catch (err) {
        dispatch({
            type: songConstants.CREATESONG_FAILED
        });
    } finally {
        dispatch({
            type: songConstants.STOP_LOADING
        });
    }
    window.location.reload();
};

export const getSongbyId = (cardId, userId) => async (dispatch) => {
    try {
        dispatch({
            type: songConstants.START_LOADING
        });

        const result = await axios.get(`/card/${cardId}/song/user/${userId}`);
        const data = result.data.data;
        const songData = {
            status: data.status,
            amount: data.amount,
            greeting: data.greeting
        };
        dispatch({
            type: songConstants.GET_SONG_BYID_SUCCESS,
            payload: {
                data: songData
            }
        });
    } catch (err) {
        dispatch({
            type: songConstants.GET_SONG_BYID_FAILED
        });
    } finally {
        dispatch({
            type: songConstants.STOP_LOADING
        });
    }
};
