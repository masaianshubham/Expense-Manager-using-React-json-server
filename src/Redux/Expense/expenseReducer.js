import {FETCH_TRANSACTION_FAILURE,FETCH_TRANSACTION_REQUEST,FETCH_TRANSACTION_SUCCESS,
    ADD_TRANSACTION_REQUEST,ADD_TRANSACTION_FAILURE,ADD_TRANSACTION_SUCCESS} from './actionType'

export const initState = {
    transactionData: [],
    error: ""

}

export default (state = initState, action) => {
    switch (action.type) {
    case FETCH_TRANSACTION_REQUEST:
      return {
        ...state,
        error: "",
      };
    case FETCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactionData: action.payload
      };
    case FETCH_TRANSACTION_FAILURE:
      return {
        ...state,
        error: "something went wrong"
    };
    case ADD_TRANSACTION_REQUEST:
      return {
        ...state,
        error: "",
      };
    case ADD_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactionData: [...state.transactionData, action.payload]
      };
    case ADD_TRANSACTION_FAILURE:
      return {
        ...state,
        error: "something went wrong"
    };

    default:
      return state;
    }
}