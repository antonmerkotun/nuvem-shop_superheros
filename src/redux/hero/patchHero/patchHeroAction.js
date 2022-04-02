import {PATCH_HERO_STARTED, PATCH_HERO_SUCCESS, PATCH_HERO_FAILURE} from "../../types";


export const patchHeroAction = (body) => {
    return async dispatch => {
        dispatch(patchHeroStarted())
        fetch(`patch/changes/hero/${body.idOb}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                nickName: body.nickName,
                realName: body.realName,
                catchPhrase: body.catchPhrase,
                originDescription: body.originDescription,
                superpowers: body.superpowers,
                avatar: body.avatar
            })
        })
            .then(res => res.json())
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