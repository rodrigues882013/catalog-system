import types from '../actions/action.types';
import initialState from './initial.state';


const collectionReduces = (state = initialState.collections, action) => {
  switch(action.type) {

    case types.LOAD.COLLECTIONS.SUCCESS:
      return action.collections;

    case types.CREATE.COLLECTION.SUCCESS:
      return [...state.filter(x => x.id !== action.collection.id), Object.assign({}, action.collection)];

    default:
      return state;
  }
};

export default collectionReduces;
