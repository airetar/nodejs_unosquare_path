//const axios = require('axios')
import axios from 'axios';

export const httpClientPlugin = {
    get: async(url: string) => {
        const { data } = await axios.get(url);
        return data;
    }
}

/**
 ** implementación sin axios

 const httpClientPlugin = {
    get: async(url) => {
        const resp = await fetch(url);
        return await resp.json();
    }

}
 */
