const _apiUrl = "/api/post"

export const getAllApprovedAndPublishedPosts = () => {
    return fetch(_apiUrl).then(res => res.json())
}

export const getApprovedAndPublishedPostById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then(res => res.json())
}