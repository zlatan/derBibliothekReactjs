import * as config from '../config';

export default function(state = config.DEFALT_PAGE_SIZE, action) {
  switch(action.type) {
  case 'BOOK_SELECTED':
    return action.payload;
  }

  return state;
}
