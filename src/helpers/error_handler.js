import { toast } from "react-toastify";

export function handleRequestError(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        // alert(error.response.data);
        toast.error(error.response.data);
        return {err_type: 'HTTP Response Error', err_msg: error.response.data};
    } 
    else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        // alert('No response from server');
        toast.error('Service Unavailable. No response from server.');
        return {err_type: 'HTTP Request Error', err_msg: 'Service Unavailable. No response from server.'};
    } 
    else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return {err_type: 'Unknown Error', err_msg: error.message};
    }
    // console.log(error.config);
}