// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import data from 'redux/modules/data';

const rootReducer = combineReducers({
  data,
  routing: routerReducer
});

export default rootReducer;
