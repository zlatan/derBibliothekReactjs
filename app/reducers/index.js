import { combineReducers } from 'redux';
import WeatherReducer from './reducer_weather';
import ActiveBook from './reducer_active_book';
import SortReducer from './reducer_sort';
import SetPageSizeReducer from './reducer_set_page_size';
import SearchReducer from './reducer_search';

const rootReducer = combineReducers({
  weather: WeatherReducer,
  activeBook: ActiveBook,
  sortBy: SortReducer,
  setPageSize: SetPageSizeReducer,
  searchAction: SearchReducer
});

export default rootReducer;
