import axios from 'axios';

const moviesAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '5913e87ce22016bd0d223d3036d4217c',
    language: 'en-US',
  },
});

export default moviesAPI;
