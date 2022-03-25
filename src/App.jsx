import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

//components
import Header from "./components/Header/Header";
import SuperheroesList from "./pages/SuperheroesList/SuperheroesList"
import {getHeroesAction} from "./redux/heroes/getHeroesAction";
import CreateSuperhero from "./pages/CreateSuperhero/CreateSuperhero";

function App() {
    const dispatch = useDispatch()
    const heroesData = useSelector(state => state.getHeroes)

    useEffect(() => {
        dispatch(getHeroesAction())
    }, [])

    return (
        <BrowserRouter>
            <div className="app">
                <div className="container">
                    <Header/>
                    <Routes>
                        <Route exact path="/" element={<SuperheroesList heroesData={heroesData}/>}/>
                        <Route exact path="/create-hero" element={<CreateSuperhero/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
