import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

//components
import SuperheroesList from "./pages/SuperheroesList/SuperheroesList"
import {getHeroesAction} from "./redux/heroes/getHeroesAction";
import {getPhotosAction} from "./redux/photos/getPhotosAction";
import {getAvatarAction} from "./redux/avatar/getAvatarAction";

function App() {
    const dispatch = useDispatch()
    const heroesData = useSelector(state => state.getHeroes)
    const photosData = useSelector(state => state.getPhotos)
    const avatarData = useSelector(state => state.getAvatar)

    useEffect(() => {
        dispatch(getHeroesAction())
        dispatch(getPhotosAction())
        dispatch(getAvatarAction())
    }, [])

    return (
            <div className="app">
                <div className="container">
                    <SuperheroesList heroesData={heroesData} photosData={photosData} avatarData={avatarData}/>
                </div>
            </div>
    );
}

export default App;
