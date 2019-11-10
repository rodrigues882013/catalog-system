import constants from "../helpers/constants";


const _list = () => {
  return fetch (`${constants.API}/discs`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
};

const _get = (id) => {
  return fetch (`${constants.API}/discs/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
};

const _create = (disc) => {
  return fetch (`${constants.API}/discs`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(disc)
  });
};

const _update = (id, disc) => {
  return fetch (`${constants.API}/discs/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(disc)
  });
};

const _delete = (id) => {
  return fetch (`${constants.API}/discs/${id}`, {
    method: 'DELETE'
  });
};

const _search = (parameters) => {
  return fetch (`${constants.API}/discs${parameters}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
};

export default {
  list: _list,
  get: _get,
  create: _create,
  update: _update,
  delete: _delete,
  search: _search
};
