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

export const deletePostReaction = (postReaction) => {
    const deleteOptions = {method: "DELETE"}

    const queryParams = `?reactionId=${postReaction.reactionId}&postId=${postReaction.postId}&userProfileId=${postReaction.userProfileId}`

    return fetch(`${_apiUrl}${queryParams}`, deleteOptions)
}