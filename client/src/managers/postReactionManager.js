const _apiUrl = "/api/postReaction"

export const createPostReaction = (postReaction) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postReaction)
    }

    return fetch(_apiUrl, postOptions)
}