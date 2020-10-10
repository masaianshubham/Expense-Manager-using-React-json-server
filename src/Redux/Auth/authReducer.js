import {
    
} from "./actionTypes"

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
                token: payload.token,
                current_user: payload.username
            }
        case LOGIN_USERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: payload.message,
            }

        case LOGOUT_USER:
            return {
                ...state,
                isAuth: false,
                user_data: {},
                github_data:[]

            }

        default:
            return state
    }
}