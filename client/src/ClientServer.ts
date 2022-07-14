import requestWrapper from './utils/requestWrapper';
import { WorkflowOptions } from './utils/constants';
const baseUrl = 'http://localhost:8080/api';

export async function getProfile(data: { authId: string }) {
    const requestOptions = {
        url: `${baseUrl}/profile`,
        method: 'POST',
        data,
    };
    return await requestWrapper(requestOptions);
}

export async function createProfile(data: {
    authId: string;
    username: string;
}) {
    const requestOptions = {
        url: `${baseUrl}/create-profile`,
        method: 'POST',
        data,
    };
    return await requestWrapper(requestOptions);
}

export async function generateWorkflow(data: {
    authId: string;
    options: WorkflowOptions;
}) {
    const requestOptions = {
        url: `${baseUrl}/workflows/generate`,
        method: 'POST',
        data,
    };
    const response = await requestWrapper(requestOptions);
    return response.data;
}
