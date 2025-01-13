const axios = require('axios')

const httpClientPlugin = {
    get: async(url) => {
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

module.exports = {
    http: httpClientPlugin,
};
