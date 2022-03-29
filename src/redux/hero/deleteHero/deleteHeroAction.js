import {DELETE_HERO_STARTED, DELETE_HERO_SUCCESS, DELETE_HERO_FAILURE} from "../../types";


export const deleteHeroAction = (id) => {
    return async dispatch => {
        dispatch(deleteHeroStarted())
        fetch(`/delete/hero/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then(res => res.json())
            .then(res => dispatch(deleteHeroSuccess(res)))
            .catch(err => dispatch(deleteHeroFailure(err.message)))
    }
}

const deleteHeroStarted = () => ({
    type: DELETE_HERO_STARTED
})

const deleteHeroSuccess = heroes => ({
    type: DELETE_HERO_SUCCESS,
    payload: heroes
})

const deleteHeroFailure = error => ({
    type: DELETE_HERO_FAILURE,
    payload: {
        error
    }
})