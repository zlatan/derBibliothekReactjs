import { SEARCH_BY } from '../actions/index';

export default function(state = [], action) {
  console.log('FETCH_WEATHER-REDUCER');
  switch (action.type) {
  case SEARCH_BY:
    return [ action.payload.data, ...state ];
  }
  return state;
}
