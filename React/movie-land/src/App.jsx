import { useState } from "react"
import MovieCard from "./movieCard"
import SearchImg from './search.svg'
import './App.css'

const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=c3c316b6'

function App() {
  const [titleInput, setTitleInput] = useState('')
  const [movies, setMovies] = useState([]) // começa como array vazio

  const searchMovies = async (title) => {
    if (!title) return;

    setMovies([]) // limpa os resultados anteriores antes da nova busca

    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();
    
    // só seta se houver resultados
    if (data.Search) {
      setMovies(data.Search)
    } 
    console.log(data.Search)
  }

  return (
    <div className='app'>
      <h1>MovieLand</h1>
      <div className='search'>
        <input
          type="text"
          placeholder='Search for movies'
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <img 
          src={SearchImg}
          alt="Search"
          onClick={() => searchMovies(titleInput)}
        />
      </div>

      {movies.length > 0 ? (
        <div className="container">      
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>      
      )}
    </div>
  )
}

export default App
