const _apiUrl = "/api/post"

export const getAllApprovedAndPublishedPosts = () => {
    return fetch(_apiUrl).then(res => res.json())
}

export const getApprovedAndPublishedPostById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then(res => res.json())
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