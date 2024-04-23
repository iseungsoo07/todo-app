import { apiClient } from "./ApiClient";

export const retrieveAllTodosForUsername = (username) => {
    return apiClient.get(`/users/${username}/todos`);
};

export const deleteTodoApi = (username, id) => {
    return apiClient.delete(`/users/${username}/todos/${id}`);
};

export const retrieveTodoApi = (username, id) => {
    return apiClient.get(`/users/${username}/todos/${id}`);
};

export const updateTodoApi = (username, id, todo) => {
    return apiClient.put(`/users/${username}/todos/${id}`, todo);
};

export const createTodoApi = (username, todo) => {
    return apiClient.post(`/users/${username}/todos`, todo);
};
