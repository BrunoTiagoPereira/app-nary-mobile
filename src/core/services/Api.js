import { getToken } from './TokenService';

async function getAsync (url) {
    return await apiAsync(url, 'GET')
}

async function postAsync (url, body, isFormData = false) {

    const requestBody = isFormData ? body : JSON.stringify(body);
    return await apiAsync(url, 'POST', requestBody, isFormData)
}

async function putAsync (url, body) {
    return await apiAsync(url, 'PUT', JSON.stringify(body))
}

async function deleteAsync (url ) {
    return await apiAsync(url, 'DELETE')
}

async function apiAsync(url, method, body, isFormData = false) {
    url = getUrl(url);
    const request = {method, body: body ?? null, headers: await getHeaders(isFormData), cache: 'no-cache' };
    const response = await fetch(url, request);
    const data = await response.json();
    return data;
}

const getHeaders = async (isFormData) => {

    const headers = {
        'authorization': `Bearer ${await getToken()}`
    };

    const contentType = isFormData ? 'multipart/form-data' : 'application/json';

    headers['content-type'] = contentType;

    return headers;
}

const getUrl = (url) => {
    return 'https://app-nary.azurewebsites.net/api/' + url;
}

export {
    getAsync,
    postAsync,
    putAsync,
    deleteAsync
}