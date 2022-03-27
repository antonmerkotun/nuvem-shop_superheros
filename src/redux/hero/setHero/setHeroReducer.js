import {SET_HERO} from "../../types";

const initialState = {};

export function setHeroReducer(state = initialState, action) {
    switch (action.type) {
        case SET_HERO:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}