import {FETCH_TRANSACTION_FAILURE,FETCH_TRANSACTION_REQUEST,FETCH_TRANSACTION_SUCCESS} from './actionType'

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
        productData: action.payload
      };
    case FETCH_TRANSACTION_FAILURE:
      return {
        ...state,
        error: "something went wrong"
    };

    default:
      return state;
    }
}