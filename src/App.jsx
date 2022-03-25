import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

//components
import Header from "./components/Header/Header";
import SuperheroesList from "./pages/SuperheroesList/SuperheroesList"
import {getHeroesAction} from "./redux/heroes/getHeroesAction";
import CreateSuperhero from "./pages/CreateSuperhero/CreateSuperhero";
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
        <BrowserRouter>
            <div className="app">
                <div className="container">
                    <Header/>
                    <Routes>
                        <Route exact path="/" element={<SuperheroesList heroesData={heroesData} photosData={photosData} avatarData={avatarData}/>}/>
                        <Route exact path="/create-hero" element={<CreateSuperhero/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;