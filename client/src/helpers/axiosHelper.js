/* eslint-disable no-useless-catch */

import axios from 'axios';

const apiUrl = import.meta.env.VITE_SERVER_URL


const fetchData = async (url, method, data = null, headers = {}) =>{

  try{
    const config = {
        method,
        url: apiUrl+url,
        headers,
        data
    }
    
    const response = await axios(config);
    return response.data;

}catch (err){
    throw err
}
}

export default fetchData