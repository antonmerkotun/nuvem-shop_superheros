import {POST_HERO_STARTED, POST_HERO_SUCCESS, POST_HERO_FAILURE} from "../../types";

const initialState = {
    // loading: false,
    // data: [],
    // error: null
};

export  function postHeroReducer(state = initialState, action) {
    switch (action.type) {
        case POST_HERO_STARTED:
            return {
                ...state,
                // loading: true
            };
        case POST_HERO_SUCCESS:
            return {
                // ...state,
                // loading: false,
                // data: [...action.payload],
                state: action.payload
                // error: null
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