"use client"; 

import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import { getTrendingMovies } from "@/utils/request";

export default function Home() {
  const [movies, setMovies] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const fetchedMovies = await getTrendingMovies();
        setMovies(fetchedMovies);
        setSearchResults(fetchedMovies); 
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

 
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredMovies);
  };

  return (
    <div>
      <h1 className="text-4xl text-center">Top Trending Movies</h1>
      
      
      <div className="text-center my-4">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="form-control w-50 mx-auto"
        />
      </div>
      
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {searchResults.length > 0 ? (
          searchResults.map((movie, index) => (
            <Card key={movie.title} movie={movie} movieId={index} />
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}
