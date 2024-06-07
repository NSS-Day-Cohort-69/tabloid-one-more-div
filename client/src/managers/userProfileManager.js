const _apiUrl = "/api/userprofile";

export const getProfiles = () => {
  return fetch(_apiUrl + "/withroles").then((res) => res.json());
};

export const getProfileById = (id) => {
  return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const getProfileWithRolesById = (id) => {
  return fetch(`${_apiUrl}/withroles/${id}`).then((res) => res.json());
}

export const changeIsActiveStatus = (id) => {
  return fetch(`${_apiUrl}?id=${id}`, {method: "PUT"})
}

export const promoteUser = (id) => {
  return fetch(`${_apiUrl}/promote/${id}`, {method: "POST"})
}

export const demoteUser = (id) => {
  return fetch(`${_apiUrl}/demote/${id}`, {method: "POST"})
}