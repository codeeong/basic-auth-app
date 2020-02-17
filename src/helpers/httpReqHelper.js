import axios from 'axios';

export default function requestData(httpObj, onSuccess, onError) {
    const serverUrl = window.location.origin;
    const params = httpObj.params ? httpObj.params : '';
    let data = httpObj.data ? JSON.stringify(httpObj.data) : '';

    return axios.request({
        url: httpObj.url,
        method: httpObj.method || 'post',
        baseURL: httpObj.baseURL || serverUrl,
        headers: {
            ...{
                'Content-Type': 'application/json',
            },
            ...httpObj.headers,
        },
        params: params,
        timeout: 40000,
        data: data,
        responseType: httpObj.responseType || "",
    }).then(onSuccess, onError);
}
