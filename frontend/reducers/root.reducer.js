import {combineReducers} from 'redux';
import discs from './disc.reducers';
import collections from './collection.reducers';


/**
 * Reducers are pure functions that receive actual state and return the new state
 *
 * Things you should never do inside a reducer:
 *  - Mutate its arguments;
 *  - Perform side effects like API calls and routing transitions;
 *  - Call non-pure functions, e.g. Date.now() or Math.random().
 */

const rootReducers = combineReducers({
  discs,
  collections,
});

export default rootReducers;
