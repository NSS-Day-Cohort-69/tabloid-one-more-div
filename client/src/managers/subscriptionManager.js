const _apiUrl = "/api/subscription"

export const createSubscription = (newSub) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(newSub)
    })
}

export const getSubscriptionsById = (Id) => {
    return fetch(`${_apiUrl}/${Id}`).then(res => res.json())
};

export const removeSubscription = (creatorId, followerId) => {
    return fetch(`${_apiUrl}?creatorId=${creatorId}&followerId=${followerId}`,{
        method: "DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    })
}