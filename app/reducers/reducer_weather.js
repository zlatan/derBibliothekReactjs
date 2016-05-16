import { FETCH_WEATHER } from '../actions/index';
import { SEARCH_BY } from '../actions/search';

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_WEATHER:
    return [ action.payload.data, ...state ];
  case SEARCH_BY:
      return [ action.payload.data, ...state ];
  }
  return state;
}
