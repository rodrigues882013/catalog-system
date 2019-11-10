import service from '../services/discs.service';
import types from './action.types';

/*
 * Action creators
 */

export const loadDiscSuccess = (disc) => ({type: types.LOAD.DISC.SUCCESS, disc});

export const loadDiscsSuccess = (discs) => ({type: types.LOAD.DISCS.SUCCESS, discs});

export const updateDiscSuccess = (disc)=> ({type: types.UPDATE.DISC.SUCCESS, disc});

export const createDiscSuccess = (disc) => ({type: types.CREATE.DISC.SUCCESS, disc});

export const deleteDiscSuccess = (disc) => ({type: types.DELETE.DISC.SUCCESS, disc});


/*
* Actions
* */
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const _loadDisc = (id) => {
  return function (dispatch) {
    return service
      .get(id)
      .then(response => response.json())
      .then(json => dispatch(loadDiscSuccess(json)))
  }
};

const _loadDiscs = () => {

  return function(dispatch){
    return service
      .list()
      .then(response => response.json())
      .then(json => dispatch(loadDiscsSuccess(json)))
      .catch(error => console.error(error));
  };

};

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const _deleteDisc = (id, history) => {

  return function(dispatch){
    return service
      .delete(id)
      .then( response => {
        dispatch(deleteDiscSuccess(response));
        history.push(`/discs`);
      })
      .catch(error => console.error(error));
  };

};

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const _updateDisc = (id, disc, history) => {

  return function(dispatch){
    return service
      .update(id, disc)
      .then(response => response.json())
      .then( json => {
        dispatch(updateDiscSuccess(json));
        history.push(`/discs`);
      })
      .catch(error => console.error(error));
  };

};

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const _createDisc = (Disc, history) => {

  return function(dispatch){
    return service
      .create(disc)
      .then(response => response.json())
      .then( json => {
        dispatch(createDiscSuccess(json));
        history.push(`/discs`);

      })
      .catch(error => console.error(error));
  };
};

export default {
  loadDisc: _loadDisc,
  createDisc: _createDisc,
  loadDiscs: _loadDiscs,
  updateDisc: _updateDisc,
  deleteDisc: _deleteDisc
}
