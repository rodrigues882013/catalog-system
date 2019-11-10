import types from '../actions/action.types';
import initialState from './initial.state';

const discReducers = (state = initialState.discs, action) => {

  switch(action.type) {
    case types.LOAD.DISC.SUCCESS:
      return action.disc;

    case types.LOAD.DISCS.SUCCESS:
      return action.discs;

    case types.UPDATE.DISC.SUCCESS:
      return [...state.filter(x => x.id !== action.disc.id), Object.assign({}, action.disc)];

    case types.CREATE.DISC.SUCCESS:
      return [...state.filter(x => x.id !== action.disc.id), Object.assign({}, action.disc)];

    case types.DELETE.DISC.SUCCESS:
      const newState = Object.assign([], state);
      const idx = state.findIndex(x => x.id === action.disc.id);
      newState.splice(idx, 1);
      return newState;

    default:
      return state;
  }
};

export default discReducers;
