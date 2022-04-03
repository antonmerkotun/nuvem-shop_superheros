import {combineReducers} from "redux";
import {getHeroesReducer} from "./heroes/getHeroesReducer";
import {getPhotosReducer} from "./photos/getPhotosReducer";
import {patchHeroReducer} from "./hero/patchHero/patchHeroReducer";

export const rootReducer = combineReducers({
    getHeroes: getHeroesReducer,
    getPhotos: getPhotosReducer,
    patchHero: patchHeroReducer,
})