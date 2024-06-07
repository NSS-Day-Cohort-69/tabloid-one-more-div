const _apiUrl = "/api/reaction";

export const getAllReactions = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

export const createReaction = (reaction) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(reaction)
    });
}