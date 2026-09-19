


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
import axios from "axios";


const movieTitle = 'Inception';

export const getMoviePosterUrl = async (title) => {
  try {
    const searchUrl = 'https://api.themoviedb.org/3/search/movie';
    
    // Axios automatically handles URL parameter encoding via the `params` option
    const response = await axios.get(searchUrl, {
      params: {
        api_key: API_KEY,
        query: title
      }
    });

    const results = response.data.results;

    if (results && results.length > 0) {
      const posterPath = results[0].poster_path;
      if (posterPath) {
        const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
        console.log('Poster URL:', posterUrl);
        return posterUrl;
      }
    }
    
    console.log('Poster not found.');
  } catch (error) {
    console.error('Error fetching movie poster:', error.message);
  }
};

const result = await getMoviePosterUrl(movieTitle);
console.log(result)