import * as config from '../config';

export default function(state = '', action) {
  switch(action.type) {
  case 'SORT_BY':
    return action.payload;
  }

  return state;
}
