import {GET_AVATAR_STARTED, GET_AVATAR_SUCCESS, GET_AVATAR_FAILURE} from "../types";


export const getAvatarAction = () => {
    return async dispatch => {
        dispatch(getAvatarStarted())
        fetch("/avatar")
            .then(res => res.json())
            .then(res => dispatch(getAvatarSuccess(res)))
            .catch(err => dispatch(getAvatarFailure(err.message)))
    }
}

const getAvatarStarted = () => ({
    type: GET_AVATAR_STARTED
})

const getAvatarSuccess = avatar => ({
    type: GET_AVATAR_SUCCESS,
    payload: avatar
})

const getAvatarFailure = error => ({
    type: GET_AVATAR_FAILURE,
    payload: {
        error
    }
})