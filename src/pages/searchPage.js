import React, { useContext, useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieSearchPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import { getMoviesPageQuery} from '../api/tmdb-api';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { AuthContext } from "../contexts/authContext";
import { MoviesContext } from "../contexts/moviesContext";

const SearchPage = (props) => {
  const context = useContext(AuthContext);
  const movieContext = useContext(MoviesContext);
  const page = movieContext.homePageNo;
  let pagination = 0;
  const [genres, setGenres] = useState('');
  const [certificates, setCertificates] = useState('');
  const [years, setYears] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const {  data, error, isLoading, isError }  = useQuery(['search', {page, searchQuery}], getMoviesPageQuery);
  

  const handleChange = (type, value) => {
    if (type === "genre") 
        setGenres(value);
    else if (type === "year")
        setYears(value);
    else
        setCertificates(value);
  };

  const handleSearchButton = () => {
      let certCountry = "";
      let withGenre = ""
      let inYears = "";
      let withCerts = "";
      if (genres !== "") {
        withGenre = "&with_genres=".concat(genres);
      }
      if (years !== "") {
          inYears = "&primary_release_year=".concat(years);
      }
      if (certificates !== "") {
          certCountry = "&certification_country=GB";
          withCerts = "&certification=".concat(certificates).concat(certCountry);
      }

      const queryParameter = certCountry.concat(withGenre).concat(inYears).concat(withCerts);

      setSearchQuery(queryParameter);

  }

  // This will trigger the moviesContext favorite array to be populated from the Users list of Favorites in TMDB
  useEffect(()=> {
    async function refreshDataLists () {
      if (context.currentUser.listId && context.currentUser.mustWatchId && context.refreshLists) {

        await movieContext.refreshFavoriteList(context.currentUser.listId);
        await movieContext.refreshMustWatchList(context.currentUser.mustWatchId);
      }
      context.setRefreshLists(false);
    };

    refreshDataLists ();

  })

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;
  pagination = data.total_results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <PageTemplate
      title="Search Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
      pagination={pagination}
      handleChange={handleChange}
      genres={genres}
      years={years}
      certificates={certificates}
      searchButton={handleSearchButton}
    />    
  );
};

export default SearchPage;