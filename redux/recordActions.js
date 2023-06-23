// Action Types
export const ADD_RECORD = 'ADD_RECORD';
export const DELETE_RECORD = 'DELETE_RECORD';
export const UPDATE_RECORD = 'UPDATE_RECORD';
export const CLEAR_RECORD = 'CLEAR_RECORD';
export const INITIAL_RECORDS = 'INITIAL_RECORDS';
export const SEARCH_RECORDS = 'SEARCH_RECORDS';

// Action Creators
export const addRecord = (record) => ({
  type: ADD_RECORD,
  payload: record,
});

export const updateRecord = (record) => ({
  type: UPDATE_RECORD,
  payload: record,
});

export const deleteRecord = (recordId) => ({
  type: DELETE_RECORD,
  payload: recordId,
});

export const clearRecord = () => ({
  type: CLEAR_RECORD,
});

