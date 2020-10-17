import {
    REGISTER_USERS_REQUEST, REGISTER_USERS_SUCCESS, REGISTER_USERS_FAILURE,
    LOGIN_USERS_REQUEST, LOGIN_USERS_SUCCESS, LOGIN_USERS_FAILURE,
    LOGOUT_USER, REMOVE_ERROR,
} from './actionType'

import { v4 as uuid } from "uuid"

import axios from "axios"


export const verifyEmail = payload => dispatch => {
    return axios.get(`https://mod-living-db.herokuapp.com/user?email=${payload}`)
        .then(res => {
            console.log(res)
            if (res.data.length === 0) {
                return
            }
            else if (res.data[0].email === payload) {
                dispatch(registerUserFailure("Email Allready Registered"))
                dispatch(handleError())
            }
        })
}

export const registerUserRequest = () => ({
    type: REGISTER_USERS_REQUEST,
})

export const registerUserSuccess = (payload) => ({
    type: REGISTER_USERS_SUCCESS,
    payload
})

export const registerUserFailure = (payload) => ({
    type: REGISTER_USERS_FAILURE,
    payload
})

export const registerRequest = payload => dispatch => {
    dispatch(registerUserRequest())
    axios.get(`https://mod-living-db.herokuapp.com/user?email=${payload.email}`)

        .then(res => {

            if (res.data.length === 0) {

                axios.post("https://mod-living-db.herokuapp.com/user", {
                    id: uuid(), ...payload
                })
                    .then(res => dispatch(registerUserSuccess("Registration Sucessfull")))
                    .catch(err => {
                        dispatch(registerUserFailure("Something went wrong"))
                        dispatch(handleError())
                    })

            }
            else if (res.data[0].email === payload.email) {
                dispatch(registerUserFailure("Email Allready Registered"))
                dispatch(handleError())
            }
        }).catch(err => {
            dispatch(registerUserFailure("Something went wrong"))
            dispatch(handleError())
        })
}



export const loginUserRequest = () => ({
    type: LOGIN_USERS_REQUEST,
})

export const loginUserSuccess = (payload) => ({
    type: LOGIN_USERS_SUCCESS,
    payload
})

export const loginUserFailure = (payload) => ({
    type: LOGIN_USERS_FAILURE,
    payload
})

export const loginRequest = payload => dispatch => {
    console.log(payload)
    dispatch(loginUserRequest())
    return axios.get(`https://mod-living-db.herokuapp.com/user?email=${payload.email}`)
        .then(res => {
            console.log(res.data)
            console.log(res.data[0].password)
            if (res.data[0].password === payload.password) {
                dispatch(loginUserSuccess(res.data))
            }
            else {
                dispatch(loginUserFailure("Invalid Password"))
                dispatch(handleError())
            }
        }).catch(err => {
            dispatch(loginUserFailure("Invalid Username"))
            dispatch(handleError())
        })
}


export const logoutUser = () => ({
    type: LOGOUT_USER
})

export const handleError = () => dispatch => {
    setTimeout(function () {
        dispatch(removerError())
    }, 4000)
}

export const removerError = () => ({
    type: REMOVE_ERROR
})