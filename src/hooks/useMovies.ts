import React, { useEffect, useState } from 'react';
import moviesAPI from '../api/movies';
import { Movie, MovieDBNowPlaying } from '../interfaces/movieInterface';

const useMovies = () => {
  const [moviesNowPlaying, setMoviesNowPlaying] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = async () => {
    const res = await moviesAPI.get<MovieDBNowPlaying>('/now_playing');
    setMoviesNowPlaying(res.data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    moviesNowPlaying,
    isLoading,
  };
};

export default useMovies;
