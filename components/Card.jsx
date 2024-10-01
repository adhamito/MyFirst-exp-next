import React from 'react';
import Link from 'next/link';


const createSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-'); 
};

const Card = ({ movie }) => {
  return (
    <div className=''>
    <Link className='text-decoration-none' href={`/movies/${createSlug(movie.title)}`}>
      <div className='card' style={{ width: '15rem' }}>
        <img src={movie.thumbnail || "https://via.placeholder.com/150"} alt="{movie.title}" />
        <div className='card-body'>
          <h5 className='card-title'>{movie.title}</h5>
          <p>{movie.year}</p>
        </div>
      </div>
    </Link>
  </div>
  );
};

export default Card;
