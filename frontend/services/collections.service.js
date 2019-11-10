import constants from "../helpers/constants";

const _list = () => {
  return fetch (`${constants.API}/collections`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
};

function _get(id){
  return fetch (`${constants.API}/collections/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
}

const _create = (collection) => {
  return fetch (`${constants.API}/collections`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(collection)
  });
};

const _update = (id, collection) => {
  return fetch (`${constants.API}/collections/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(collection)
  });
};

export default {
  list: _list,
  get: _get,
  create: _create,
  update: _update
};
