const _apiUrl = "/api/comment";

export const getAllComments = (postId) => {
  return fetch(`${_apiUrl}?postId=${postId}`).then((res) => res.json());
};
