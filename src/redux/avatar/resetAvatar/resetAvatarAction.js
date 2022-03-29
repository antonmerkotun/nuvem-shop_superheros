import {RESET_AVATAR_STARTED, RESET_AVATAR_SUCCESS, RESET_AVATAR_FAILURE} from "../../types";


export const resetAvatarAction = (id) => {
    return async dispatch => {
        dispatch(resetAvatarStarted())
        fetch(`/reset/avatar/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({

            })
        })
            .then(res => res.json())
            .then(res => dispatch(resetAvatarSuccess(res)))
            .catch(err => dispatch(resetAvatarFailure(err.message)))
    }
}

const resetAvatarStarted = () => ({
    type: RESET_AVATAR_STARTED
})

const resetAvatarSuccess = heroes => ({
    type: RESET_AVATAR_SUCCESS,
    payload: heroes
})
//
const resetAvatarFailure = error => ({
    type: RESET_AVATAR_FAILURE,
    payload: {
        error
    }
})