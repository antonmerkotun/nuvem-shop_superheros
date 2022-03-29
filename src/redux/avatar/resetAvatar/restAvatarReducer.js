import {RESET_AVATAR_STARTED, RESET_AVATAR_SUCCESS, RESET_AVATAR_FAILURE} from "../../types";

const initialState = {};

export  function resetAvatarReducer(state = initialState, action) {
    switch (action.type) {
        case RESET_AVATAR_STARTED:
            return {
                ...state,
            };
        case RESET_AVATAR_SUCCESS:
            return {
                state: action.payload
            };
        case RESET_AVATAR_FAILURE:
            return {
                ...state,
            };
        default:
            return state;
    }
}