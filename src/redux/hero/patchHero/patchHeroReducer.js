import {PATCH_HERO_STARTED, PATCH_HERO_SUCCESS, PATCH_HERO_FAILURE} from "../../types";

const initialState = {};

export  function patchHeroReducer(state = initialState, action) {
    switch (action.type) {
        case PATCH_HERO_STARTED:
            return {
                ...state,
            };
        case PATCH_HERO_SUCCESS:
            return {
                state: action.payload
            };
        case PATCH_HERO_FAILURE:
            return {
                ...state,
            };
        default:
            return state;
    }
}