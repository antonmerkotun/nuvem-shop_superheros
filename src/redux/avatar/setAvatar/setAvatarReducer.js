import {SET_AVATAR_STARTED, SET_AVATAR_SUCCESS, SET_AVATAR_FAILURE} from "../../types";

const initialState = {};

export  function setAvatarReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AVATAR_STARTED:
            return {
                ...state,
            };
        case SET_AVATAR_SUCCESS:
            return {
                state: action.payload
            };
        case SET_AVATAR_FAILURE:
            return {
                ...state,
            };
        default:
            return state;
    }
}