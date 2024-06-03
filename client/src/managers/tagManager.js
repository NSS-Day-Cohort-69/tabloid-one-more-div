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

export const getTagById = (Id) => {
    return fetch(`${_api}/${Id}`).then((res) => res.json())
}

export const updateTag = (Id, updateTag) => {
    return fetch(`${_api}/${Id}`,{
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(updateTag)
    });
}

export const deleteTag = (id) => {
    return fetch(`${_api}/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(id)
    })
}