import {PATCH_HERO_STARTED, PATCH_HERO_SUCCESS, PATCH_HERO_FAILURE} from "../../types";
import axios from "axios";


export const patchHeroAction = (body) => {
    return async dispatch => {
        dispatch(patchHeroStarted())
        axios.patch(`patch/changes/hero/${body.idOb}`, {
            nickName: body.nickName,
            realName: body.realName,
            catchPhrase: body.catchPhrase,
            originDescription: body.originDescription,
            superpowers: body.superpowers,
            avatar: body.avatar
        })
            .then(res => dispatch(patchHeroSuccess(res)))
            .catch(err => dispatch(patchHeroFailure(err.message)))
    }
}

const patchHeroStarted = () => ({
    type: PATCH_HERO_STARTED
})

const patchHeroSuccess = heroes => ({
    type: PATCH_HERO_SUCCESS,
    payload: heroes
})
//
const patchHeroFailure = error => ({
    type: PATCH_HERO_FAILURE,
    payload: {
        error
    }
})