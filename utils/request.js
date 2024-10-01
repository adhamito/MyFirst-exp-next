const BASE_URL = 'https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies-2020s.json';

export const getTrendingMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}`);
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};


