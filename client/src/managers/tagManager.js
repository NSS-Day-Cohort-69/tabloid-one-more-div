const _api = "/api/tag"

export const getAllTags = () => {
    return fetch(_api).then((res) => res.json())
}