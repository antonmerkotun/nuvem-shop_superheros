import {GET_HEROES_STARTED, GET_HEROES_SUCCESS, GET_HEROES_FAILURE} from "../types";

const initialState = {
    loading: false,
    data: [],
    error: null
};

export  function getHeroesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_HEROES_STARTED:
            return {
                ...state,
                loading: true
            };
        case GET_HEROES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: [...action.payload],
                error: null
            };
        case GET_HEROES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}