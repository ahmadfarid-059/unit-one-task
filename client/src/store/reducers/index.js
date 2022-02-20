import { combineReducers } from 'redux';
import ItemsReducer from './items';

const reducer = combineReducers({
    items: ItemsReducer
  });
  
  export default reducer;