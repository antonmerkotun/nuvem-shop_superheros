import {combineReducers} from "redux";
import {getHeroesReducer} from "./heroes/getHeroesReducer";
import {getPhotosReducer} from "./photos/getPhotosReducer";
import {getAvatarReducer} from "./avatar/getAvatarReducer";

export const rootReducer = combineReducers({
    getHeroes: getHeroesReducer,
    getPhotos: getPhotosReducer,
    getAvatar: getAvatarReducer,
})