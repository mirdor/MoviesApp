import { useEffect, useState } from 'react';
import moviesAPI from '../api/movies';
import { Movie, MoviesResponse } from '../interfaces/movieInterface';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

const useMovies = () => {
  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = async () => {
    const nowPlayingPromise = moviesAPI.get<MoviesResponse>('/now_playing');
    const popularPromise = moviesAPI.get<MoviesResponse>('/popular');
    const topRatedPromise = moviesAPI.get<MoviesResponse>('/top_rated');
    const upcomingPromise = moviesAPI.get<MoviesResponse>('/upcoming');

    try {
      const res = await Promise.all([
        nowPlayingPromise,
        popularPromise,
        topRatedPromise,
        upcomingPromise,
      ]);

      setMoviesState({
        nowPlaying: res[0].data.results,
        popular: res[1].data.results,
        topRated: res[2].data.results,
        upcoming: res[3].data.results,
      });

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    ...moviesState,
    isLoading,
  };
};

export default useMovies;
