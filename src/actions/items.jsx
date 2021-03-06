export const ADD_ITEM = 'ADD_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const addItem = item => dispatch => dispatch({ type: ADD_ITEM, payload: item });

export const editItem = item => dispatch => dispatch({ type: EDIT_ITEM, payload: item });

export const deleteItem = item => dispatch => dispatch({ type: DELETE_ITEM, payload: item });
