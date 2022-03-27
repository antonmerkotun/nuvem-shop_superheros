import {SET_HERO} from "../../types";

export const setHeroAction = (data) => {
    return async dispatch => {
        dispatch(setHero(data))
    }
}

const setHero = data => ({
    type: SET_HERO,
    payload: data
})
