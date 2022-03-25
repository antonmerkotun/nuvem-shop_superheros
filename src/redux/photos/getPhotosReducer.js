import {GET_PHOTOS_STARTED, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAILURE} from "../types";

const initialState = {
    loading: false,
    data: [],
    error: null
};

export  function getPhotosReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PHOTOS_STARTED:
            return {
                ...state,
                loading: true
            };
        case GET_PHOTOS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: [...action.payload],
                error: null
            };
        case GET_PHOTOS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}