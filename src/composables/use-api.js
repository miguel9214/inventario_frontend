import axios from 'axios';

export const useApi = async function (url, method = 'GET', payload = {}) { 

    url = `http://192.168.1.9:8000/api/${url}`;

    try {
        let headers = {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
        }

        const token = localStorage.getItem("access_token")
        if(token) headers.Authorization = `Bearer ${token}`

        const config = {
            method: method,
            url: url,
            data: payload,
            headers: headers,
        };

        const response = await axios(config);
        return response.data

    } catch (error) {
        
        const {status, data} = error.response
        if(status == 401 || (status == 500 && data.message === "Token has expired")){
            localStorage.removeItem("token");
            window.location.href ="/signin";
        }else{
            throw data
        }

    }

}