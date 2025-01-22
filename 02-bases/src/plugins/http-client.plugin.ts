//const axios = require('axios')
import axios from 'axios';

export const httpClientPlugin = {
    get: async(url: string) => {
        const { data } = await axios.get(url);
        return data;
    },

    post: async(url: string, body: any) => {
        throw new Error('Not implemented');
    },

    put: async(url: string, body: any) => {
        throw new Error('Not implemented');
    },

    delete: async(url: string) => {
        throw new Error('Not implemented');
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
