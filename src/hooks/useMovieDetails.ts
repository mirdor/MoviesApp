import axios from 'axios';
import { useEffect, useState } from 'react';
import moviesAPI from '../api/movies';
import { MovieDetails } from '../interfaces/movieInterface';
import { Cast, CreditsResponse } from '../interfaces/creditsInterface';

interface MovieDetailsState {
  isLoading: boolean;
  cast: Cast[];
  movieData?: MovieDetails;
}

const useMovieDetails = (id: number) => {
  const [state, setState] = useState<MovieDetailsState>({
    isLoading: true,
    movieData: undefined,
    cast: [],
  });

  const getMovieDetails = async () => {
    try {
      const movieDetailsPromise = moviesAPI.get<MovieDetails>(`/${id}`);
      const creditsResponse = moviesAPI.get<CreditsResponse>(`/${id}/credits`);

      const [movieDetailsRes, castDetailsRes] = await Promise.all([
        movieDetailsPromise,
        creditsResponse,
      ]);

      setState({
        isLoading: false,
        movieData: movieDetailsRes.data,
        cast: castDetailsRes.data.cast,
      });
    } catch (error) {
      console.log('alto error');

      console.log(error);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {
    ...state,
  };
};

export default useMovieDetails;
