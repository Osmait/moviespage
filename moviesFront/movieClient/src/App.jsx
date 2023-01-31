import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import api from "./api/axiosConfig";

import "./App.css";
import { Header } from "./components/header/Header";
import { Home } from "./components/home/Home";
import { Layout } from "./components/Layout";
import { NotFount } from "./components/notFound/NotFount";
import { Reviews } from "./components/reviews/Reviews";
import { Trailer } from "./components/trailer/Trailer";

function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await api.get("/movies");

      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);


  const getMovieData = async (movieId) => {
     
    try 
    {
        const response = await api.get(`/movies/${movieId}`);

        const singleMovie = response.data;
      console.log(singleMovie)
        setMovie(singleMovie);

        setReviews(singleMovie.reviewIds);
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  }

  useEffect(() => {
    getMovies();
  },[])

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}/>
           <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}/>
           <Route path="/*" element={<NotFount/>}/>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
