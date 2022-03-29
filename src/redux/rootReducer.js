import {combineReducers} from "redux";
import {getHeroesReducer} from "./heroes/getHeroesReducer";
import {getPhotosReducer} from "./photos/getPhotosReducer";
import {getAvatarReducer} from "./avatar/getAvatarReducer";
import {setHeroReducer} from "./hero/setHero/setHeroReducer";
import {postHeroReducer} from "./hero/postHero/postHeroReducer";
import {patchHeroReducer} from "./hero/patchHero/patchHeroReducer";
import {resetAvatarReducer} from "./avatar/resetAvatar/restAvatarReducer";
import {setAvatarReducer} from "./avatar/setAvatar/setAvatarReducer";

export const rootReducer = combineReducers({
    getHeroes: getHeroesReducer,
    getPhotos: getPhotosReducer,
    getAvatar: getAvatarReducer,
    postHero: postHeroReducer,
    setHero: setHeroReducer,
    patchHero: patchHeroReducer,
    resetAvatar: resetAvatarReducer,
    setAvatar: setAvatarReducer,
})