import React from 'react';
import Link from 'next/link';
import { getTrendingMovies } from '../../../utils/request';


const createSlugTitle = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

const createSlugGenres = (genres) => {
  return genres.map(genre => genre.toLowerCase().replace(/[^a-z0-9]+/g, '-')).join('-');
};


async function getMovie(title) {
  const movies = await getTrendingMovies();
  const titleSlug = createSlugTitle(title); 
  return movies.find((movie) => createSlugTitle(movie.title) === titleSlug); 
}


async function getSimilarMovies(genres) {
  const movies = await getTrendingMovies();
  const genreSlug = createSlugGenres(genres); // Slugify genres from params
  return movies.filter((movie) => createSlugGenres(movie.genres) === genreSlug); 
}


async function MovieDetailsPage({ params }) {
  const movie = await getMovie(params.title); 

  if (!movie) {
    return <div className="text-center mt-5">Movie not found.</div>; 
  }

  const similarMovies = await getSimilarMovies(movie.genres); 

  return (
    <div className="container my-5">
      <div className="row">
      
        <div className="col-md-4">
          <img
            className="img-fluid rounded mb-3"
            src={movie.thumbnail || 'https://via.placeholder.com/150'}
            alt={movie.title}
          />
        </div>

        
        <div className="col-md-8">
          <h1 className="display-4">{movie.title}</h1>
          <p className="lead">{movie.extract}</p>

          <h5 className="mt-4">Cast</h5>
          <ul className="list-group list-group-flush mb-4">
            {movie.cast.map((actor) => (
              <li key={actor} className="list-group-item">
                {actor}
              </li>
            ))}
          </ul>

          <Link href="/" className="btn btn-primary mt-3">Back to Home</Link>
        </div>
      </div>

     
      <div className="row mt-5">
        <h3>Similar Movies</h3>
        {similarMovies.length > 0 ? (
          similarMovies.map((similarMovie) => (
            <div key={similarMovie.id} className="col-md-3 mb-4">
              <div className="card h-100">
                <img
                  src={similarMovie.thumbnail || 'https://via.placeholder.com/150'}
                  className="card-img-top"
                  alt={similarMovie.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{similarMovie.title}</h5>
                  <p className="card-text">{similarMovie.year}</p>
                  <Link href={`/movies/${createSlugTitle(similarMovie.title)}`} className="btn btn-primary">View Details</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No similar movies found.</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetailsPage;
