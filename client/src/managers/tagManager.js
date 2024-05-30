const _api = "/api/tag"

export const getAllTags = () => {
    return fetch(_api).then((res) => res.json())
}

export const createTag = (newTag) => {
    return fetch(_api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTag)
    })
}