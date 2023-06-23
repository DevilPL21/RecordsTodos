import { ADD_RECORD, DELETE_RECORD, UPDATE_RECORD, CLEAR_RECORD, INITIAL_RECORDS, SEARCH_RECORDS } from './recordActions';

const initialState = {
  records: [],
};

const recordReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECORD:
      return {
        ...state,
        records: [...state.records, action.payload],
      };
    case UPDATE_RECORD:
      const updatedRecords = state.records.map((record) =>
      record.key === action.payload.key ? action.payload : record
      );
      return {
        ...state,
        records: [...updatedRecords],
      };
    case DELETE_RECORD:
      const filteredRecords = state.records.filter((record) => record.key !== action.payload);
      return {
        ...state,
        records: [...filteredRecords],
      };
    case CLEAR_RECORD:
      return {
        records: [],
      };
    case INITIAL_RECORDS:
      return {
        records: action.payload,
      };
    case SEARCH_RECORDS:
      return {
        records: action.payload,
      };
    default:
      return state;
  }
};

export default recordReducer;

