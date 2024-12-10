import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home/Home";
import Movies from "./Pages/Movies/Movies";
import Genres from "./Pages/Genres/Genres";
import Directors from "./Pages/Directors/Directors";

function App() {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Movies/>} />
                    <Route path="/directors" element={<Directors />} />
                    <Route path="/genres" element={<Genres/>} />
                </Routes>
            </MainLayout>
        </Router>
    );
}

export default App;
