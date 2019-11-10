import service from '../services/collections.service';
import types from './action.types';

/*
 * Action creators
 */

export const loadCollectionsSuccess = (collections) => ({type: types.LOAD.COLLECTIONS.SUCCESS, collections});

export const updateCollectionSuccess = (collections) => ({type: types.UPDATE.COLLECTION.SUCCESS, collections});

export const createCollectionSuccess = (collection) => ({type: types.CREATE.COLLECTION.SUCCESS, collection});

/*
* Actions
* */
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const _loadCollections = () => {

  return function(dispatch){
    return service
      .list()
      .then(response => response.json())
      .then(json => dispatch(loadCollectionsSuccess(json)))
      .catch(error => console.error(error));
  };

};

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const _createCollection = (collection, history) => {

  return function(dispatch){
    return service
      .create(collection)
      .then(response => response.json())
      .then( json => {
        dispatch(createCollectionSuccess(json));
        history.push(`/collections`);

      })
      .catch(error => console.error(error));
  };
};

const _updateCollection = (id, collection, history) => {

  return function(dispatch){
    return service
      .update(id, collection)
      .then(response => response.json())
      .then( json => {
        dispatch(updateCollectionSuccess(json));
        history.push(`/collections`);

      })
      .catch(error => console.error(error));
  };
};

export default {
  loadCollections: _loadCollections,
  createCollection: _createCollection,
  updateCollection: _updateCollection
}
