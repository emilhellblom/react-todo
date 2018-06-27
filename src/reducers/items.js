import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM } from '../actions/items';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.payload];

    case EDIT_ITEM:
      return state.map((item) => {
        if (item.title === action.payload.title) {
          item = action.payload;
        }
        return item;
      });

    case DELETE_ITEM:
      return state.filter(item => item.title !== action.payload);

    default:
      return state;
  }
};
