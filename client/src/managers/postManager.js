const _apiUrl = "/api/post"

export const getAllApprovedAndPublishedPosts = () => {
    return fetch(_apiUrl).then(res => res.json())
}

export const getApprovedAndPublishedPostById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then(res => res.json())
}

export const getMyPosts = (id) => {
    return fetch(`${_apiUrl}/${id}/myPosts`).then(res => res.json())
}

export const getPostForEdit = (id) => {
    return fetch(`${_apiUrl}/${id}/forEdit`).then(res => res.json())
}

export const createPost = (post) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }
    
    return fetch(_apiUrl, postOptions)
}

export const deletePost = (postId) => {
    const deleteOptions = {method: "DELETE"}

    return fetch(`${_apiUrl}/${postId}`, deleteOptions)
}

export const updatePost = (postId, postUpdate) => {
    const putOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postUpdate)
    }

    return fetch(`${_apiUrl}/${postId}`, putOptions)
}

export const publishPost = (postId) => {
    const putOptions = {method: "PUT"}

    return fetch(`${_apiUrl}/${postId}/publish`, putOptions)
}

export const unpublishPost = (postId) => {
    const putOptions = {method: "PUT"}

    return fetch(`${_apiUrl}/${postId}/unpublish`, putOptions)
}

export const getUnapprovedPosts = () => {
    return fetch(`${_apiUrl}/unapproved`).then(res => res.json());
}

export const approvePost = (postId) => {
    return fetch(`${_apiUrl}/${postId}/approve`,{
        method: "PUT",
        headers: {
            "Content-Type":"application.json"
        }
    })
}

export const getUnapprovedCount = () => {
    return fetch(`${_apiUrl}/unapprovedCount`).then(res => res.json());
}

export const getSubscribedPosts = (id) => {
    return fetch(`${_apiUrl}/${id}/subscribedPosts`).then(res => res.json());
}