const _apiUrl = "/api/comment";

export const getAllComments = (postId) => {
  return fetch(`${_apiUrl}?postId=${postId}`).then((res) => res.json());
};

export const createComment = (comment) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(comment)
  })
}