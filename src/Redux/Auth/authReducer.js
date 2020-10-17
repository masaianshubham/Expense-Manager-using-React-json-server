import { REGISTER_USERS_REQUEST, REGISTER_USERS_SUCCESS, REGISTER_USERS_FAILURE, 
    LOGIN_USERS_REQUEST,LOGIN_USERS_SUCCESS,LOGIN_USERS_FAILURE,LOGOUT_USER,REMOVE_ERROR, } from "./actionType"

export const initState = {
    isLoading: false,
    user_data: {},
    message: "",
    isError: false,
    isAuth: false,
    current_user: "",
}


export default (state = initState, { type, payload }) => {
    
    switch (type) {

        case REGISTER_USERS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case REGISTER_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                message: payload,
            }
        case REGISTER_USERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: payload,
            }

        case LOGIN_USERS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case LOGIN_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isAuth: true,
                user_data: payload
            }
        case LOGIN_USERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: payload,
            }
        case LOGOUT_USER:
            return {
                ...state,
                isAuth: false,
                user_data: {},
            }
        case REMOVE_ERROR:
            return {
                ...state,
                message:"",
                isError:false
            }
        default:
            return state
    }
}