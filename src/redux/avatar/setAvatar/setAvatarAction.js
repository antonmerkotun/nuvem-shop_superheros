import {SET_AVATAR_STARTED, SET_AVATAR_SUCCESS, SET_AVATAR_FAILURE} from "../../types";


export const setAvatarAction = (id) => {
    return async dispatch => {
        dispatch(setAvatarStarted())
        fetch(`/set/avatar/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({

            })
        })
            .then(res => res.json())
            .then(res => dispatch(setAvatarSuccess(res)))
            .catch(err => dispatch(setAvatarFailure(err.message)))
    }
}

const setAvatarStarted = () => ({
    type: SET_AVATAR_STARTED
})

const setAvatarSuccess = heroes => ({
    type: SET_AVATAR_SUCCESS,
    payload: heroes
})
//
const setAvatarFailure = error => ({
    type: SET_AVATAR_FAILURE,
    payload: {
        error
    }
})