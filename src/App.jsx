import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

//components
import SuperheroesList from "./pages/SuperheroesList/SuperheroesList"
import {getHeroesAction} from "./redux/heroes/getHeroesAction";
import {getPhotosAction} from "./redux/photos/getPhotosAction";

function App() {
    const dispatch = useDispatch()
    const heroesData = useSelector(state => state.getHeroes)
    const photosData = useSelector(state => state.getPhotos)

    useEffect(() => {
        dispatch(getHeroesAction())
        dispatch(getPhotosAction())
    }, [])

    return (
            <div className="app">
                <div className="container">
                    <SuperheroesList heroesData={heroesData} photosData={photosData}/>
                </div>
            </div>
    );
}

export default App;
