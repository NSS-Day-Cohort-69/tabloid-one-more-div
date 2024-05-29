const _apiUrl = "/api/category";

export const getCategories = () => {
    return fetch(_apiUrl).then((res) => res.json());
};