import {DELETE_HERO_STARTED, DELETE_HERO_SUCCESS, DELETE_HERO_FAILURE} from "../../types";
import axios from "axios";


export const deleteHeroAction = (id) => {
    return async dispatch => {
        dispatch(deleteHeroStarted())
        axios.delete(`/delete/hero/${id}`)
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