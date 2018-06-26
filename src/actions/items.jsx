export const ADD_ITEM = 'ADD_ITEM';

export const addItem = item => dispatch => dispatch({ type: ADD_ITEM, payload: item });
