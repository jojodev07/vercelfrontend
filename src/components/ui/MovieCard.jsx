import { Button } from "./button"

function MovieCard({movie}) {

    function onFavouriteClick() {
        alert("You hearted a movie!");
    }

    return (<div className="movie-card">
        <div className="movie-image">
            <img src={movie.url} alt={movie.title}/>
            <Button onClick={onFavouriteClick}>Heart me!</Button>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
        </div>
    </div>)
}

export default MovieCard;