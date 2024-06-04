const _apiUrl = "/api/PostTag"

export const update = (postId, newTags) => {
    return fetch(`${_apiUrl}?postId=${postId}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTags)
    })
}