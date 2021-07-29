import { useState } from "react";
import { useQuery } from 'react-query'
import {getMoviesPageQuery} from '../api/tmdb-api';
import Spinner from '../components/spinner';

const useSearchMovies = (page, query) => {
  const [searchedMovies, setSearchedMovies] = useState([]);

  const {  data, error, isLoading, isError }  = useQuery(['search', {page, query}], getMoviesPageQuery);

  if (isLoading) {
      return <Spinner />
    }
  
    if (isError) {
      return <h1>{error.message}</h1>
    }  
    searchedMovies(data.results);
  
  return [searchedMovies, setSearchedMovies];
};

export default useSearchMovies