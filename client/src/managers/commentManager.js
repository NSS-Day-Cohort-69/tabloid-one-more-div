const _apiUrl = "/api/comment";

export const getAllComments = (postId) => {
  return fetch(`${_apiUrl}?postId=${postId}`).then((res) => res.json());
};

export const deleteComment = (postId) => {
  const deleteOptions = { method: "DELETE" };
  return fetch(`${_apiUrl}/${postId}`, deleteOptions);
};

export const createComment = (comment) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(comment)
  })
};

export const updateComment = (id, updateComment) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(updateComment)
  })
};

export const getCommentById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json())
};