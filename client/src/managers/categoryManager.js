const _apiUrl = "/api/category";

export const getAllCategories = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

export const createCategory = (category) => {
    return fetch(`${_apiUrl}/create`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    });
}

export const deleteCategory = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(id)
    });
}