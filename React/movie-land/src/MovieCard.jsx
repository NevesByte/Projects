import './App.css'

function MovieCard({movie, id}) {
    
    return(
        <div className="movie">
            <div>
              <p>{movie.Year}</p>
            </div>

            <div>
              <img src={movie.Poster} alt="" />
            </div>

            <div>
              <span>{movie.Type}</span>
              <span>{movie.Title}</span>
            </div>
        </div>
    )
}

export default MovieCard