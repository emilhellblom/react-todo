import { ADD_ITEM } from '../actions/items';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.payload];
    default:
      return state;
  }
};
