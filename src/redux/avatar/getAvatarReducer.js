import {GET_AVATAR_STARTED, GET_AVATAR_SUCCESS, GET_AVATAR_FAILURE} from "../types";

const initialState = {
    loading: false,
    data: [],
    error: null
};

export  function getAvatarReducer(state = initialState, action) {
    switch (action.type) {
        case GET_AVATAR_STARTED:
            return {
                ...state,
                loading: true
            };
        case GET_AVATAR_SUCCESS:
            return {
                ...state,
                loading: false,
                data: [...action.payload],
                error: null
            };
        case GET_AVATAR_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}