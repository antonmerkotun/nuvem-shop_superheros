import {POST_HERO_STARTED, POST_HERO_SUCCESS, POST_HERO_FAILURE} from "../../types";

const initialState = {
    // loading: false,
    // data: [],
    // error: null
};

export  function deleteHeroReducer(state = initialState, action) {
    switch (action.type) {
        case POST_HERO_STARTED:
            return {
                ...state,
                // loading: true
            };
        case POST_HERO_SUCCESS:
            return {
                state: action.payload
            };
        case POST_HERO_FAILURE:
            return {
                ...state,
                // loading: false,
                // error: action.payload.error
            };
        default:
            return state;
    }
}