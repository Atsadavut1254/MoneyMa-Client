import axios from 'axios';
import { LONGDO_MAP_URL } from '../config/evironmentConfig';

let apiMap = axios.create({
    baseURL: LONGDO_MAP_URL,
    timeout: 10000
});

export const apiURL = {
    apiMap
};
