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