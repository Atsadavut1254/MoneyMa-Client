import axios from 'axios';
import { authConstants } from '../constants/authConstants';

export const login = (data) => async (dispatch) => {
    dispatch({
        type: authConstants.START_LOADING
    });
    try {
        const result = await axios.post('/auth/access-token', data);

        const token = result.data.accesstoken;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);

        dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: {
                data: result.data.accesstoken
            }
        });
    } catch (err) {
        console.log(err);

        dispatch({
            type: authConstants.LOGIN_FAILED
        });
    } finally {
        dispatch({
            type: authConstants.STOP_LOADING
        });
    }
};
