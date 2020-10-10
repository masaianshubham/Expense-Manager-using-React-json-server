import {FETCH_TRANSACTION_FAILURE,FETCH_TRANSACTION_REQUEST,FETCH_TRANSACTION_SUCCESS,
        ADD_TRANSACTION_REQUEST,ADD_TRANSACTION_FAILURE,ADD_TRANSACTION_SUCCESS} from './actionType'
import axios from 'axios'

export const fetchTransactionRequest = () => ({
    type: FETCH_TRANSACTION_REQUEST
})

export const fetchTransactionSuccess = (payload) => ({
    type: FETCH_TRANSACTION_SUCCESS,
    payload
})

export const fetchTransactionFailure = () => ({
    type: FETCH_TRANSACTION_FAILURE
})

export const fetchTransaction = () => (dispatch) => {
    dispatch(fetchTransactionRequest());
    axios
      .get("https://mod-living-db.herokuapp.com/transaction")
      .then((res) => {
          console.log(res)
        dispatch(fetchTransactionSuccess(res.data));
      })
      .catch((err) => {
          console.log(err)
        dispatch(fetchTransactionFailure());
      });
  };

export const addTransactionRequest = () => ({
    type: ADD_TRANSACTION_REQUEST
})

export const addTransactionSuccess = (payload) => ({
    type: ADD_TRANSACTION_SUCCESS,
    payload
})

export const addTransactionFailure = () => ({
    type: ADD_TRANSACTION_FAILURE
})

export const addTransaction = (payload) => (dispatch) => {
    dispatch(addTransactionRequest());
    axios
      .post("https://mod-living-db.herokuapp.com/transaction",{
        user_id: 1,
        title: payload.title,
        type: payload.type,
        amount: payload.amount,
        timestamp: new Date()
      })
      .then((res) => {
          console.log(res)
        dispatch(addTransactionSuccess(res.data));
      })
      .catch((err) => {
          console.log(err)
        dispatch(addTransactionFailure());
      });
  };