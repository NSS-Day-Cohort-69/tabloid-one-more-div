const _apiUrl = "/api/comment";

export const getAllComments = (postId) => {
  return fetch(`${_apiUrl}?postId=${postId}`).then((res) => res.json());
};

export const deleteComment = (postId) => {
  const deleteOptions = { method: "DELETE" };
  return fetch(`${_apiUrl}/${postId}`, deleteOptions);
};
