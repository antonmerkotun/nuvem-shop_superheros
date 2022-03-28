import {POST_HERO_STARTED, POST_HERO_SUCCESS, POST_HERO_FAILURE} from "../../types";


export const postHeroAction = (body) => {
    console.log()
    return async dispatch => {
        dispatch(postHeroStarted())
        fetch("/add/hero", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                nickName: body.nickName,
                realName: body.realName,
                catchPhrase: body.catchPhrase,
                originDescription: body.originDescription,
                superpowers: body.superpowers,
            })
        })
            .then(res => res.json())
            .then(res => dispatch(postHeroSuccess(res)))
            .catch(err => dispatch(postHeroFailure(err.message)))
    }
}

const postHeroStarted = () => ({
    type: POST_HERO_STARTED
})

const postHeroSuccess = heroes => ({
    type: POST_HERO_SUCCESS,
    payload: heroes
})

const postHeroFailure = error => ({
    type: POST_HERO_FAILURE,
    payload: {
        error
    }
})