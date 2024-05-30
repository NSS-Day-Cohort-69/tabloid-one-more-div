const _apiUrl = "/api/post"

export const getAllApprovedAndPublishedPosts = () => {
    return fetch(_apiUrl).then(res => res.json())
}