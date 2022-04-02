import {GET_HEROES_STARTED, GET_HEROES_SUCCESS, GET_HEROES_FAILURE} from "../types";


export const getHeroesAction = () => {
    return async dispatch => {
        dispatch(getHeroesStarted())
        fetch("/get/heroes")
            .then(res => res.json())
            .then(res => dispatch(getHeroesSuccess(res)))
            .catch(err => dispatch(getHeroesFailure(err.message)))
    }
}

const getHeroesStarted = () => ({
    type: GET_HEROES_STARTED
})

const getHeroesSuccess = heroes => ({
    type: GET_HEROES_SUCCESS,
    payload: heroes
})

const getHeroesFailure = error => ({
    type: GET_HEROES_FAILURE,
    payload: {
        error
    }
})