import axios from 'axios';
import { useState, useEffect } from 'react';

const useApi = (initialData) => {
    const [data, setData] = useState(initialData);
    useEffect(() => { }, [data]);
    const request = async (url, method, inputValues) => {
        let response;
        if (method == 'POST') {st(url, inputValues);
        } else if (method == 'GET') {            
            response = await axios.get(url);
        } else if (method == 'DELETE') {
            response = await axios.delete(url);
        } else if (method == 'PUT') {
            response = await axios.delete(url, inputValues);
        }
        setData(response.data);
    }
    return [data, request];
}

export default useApi