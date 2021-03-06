// @flow
import { fromJS } from 'immutable';

export const IMPORT_JSON_SUCCESS = 'json-value-editor/data/IMPORT_JSON_SUCCESS';
export const IMPORT_JSON_FAILURE = 'json-value-editor/data/IMPORT_JSON_FAILURE';
export const UPDATE_VALUE = 'json-value-editor/data/UPDATE_VALUE';

export const importJSON = (json: Object, filename: string): ActionType => ({
  type: IMPORT_JSON_SUCCESS,
  payload: {
    json,
    filename
  }
});

export const importJSONFailure = (): ActionType => ({
  type: IMPORT_JSON_FAILURE,
  payload: {}
});

export const updateValue = (id: string, value: string): ActionType => ({
  type: UPDATE_VALUE,
  payload: { id, value }
});

export const initialState = fromJS({
  json: {},
  filename: '',
  error: false
});

export default function reducer(state: StateType = initialState, action: ActionType): StateType {
  switch (action.type) {
    case IMPORT_JSON_SUCCESS:
      return state.merge({
        json: action.payload.json,
        filename: action.payload.filename,
        error: false
      });
    case IMPORT_JSON_FAILURE:
      return state.merge({
        json: {},
        filename: '',
        error: true
      });
    case UPDATE_VALUE:
      return state.setIn(['json'].concat(action.payload.id), action.payload.value);
    default:
      return state;
  }
}
