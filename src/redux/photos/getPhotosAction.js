import {GET_PHOTOS_STARTED, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAILURE} from "../types";
import axios from "axios";


export const getPhotosAction = () => {
    return async dispatch => {
        dispatch(getPhotosStarted())
        axios.get('/get/heroes-photos')
            .then(res => dispatch(getPhotosSuccess(res.data)))
            .catch(err => dispatch(getPhotosFailure(err.message)))
    }
}

const getPhotosStarted = () => ({
    type: GET_PHOTOS_STARTED
})

const getPhotosSuccess = photos => ({
    type: GET_PHOTOS_SUCCESS,
    payload: photos
})

const getPhotosFailure = error => ({
    type: GET_PHOTOS_FAILURE,
    payload: {
        error
    }
})