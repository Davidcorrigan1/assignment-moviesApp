  //--------------------------------------------------------------------------------------------
  // returns as array of movies in json format
  //--------------------------------------------------------------------------------------------
  export const getMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    );
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  };

  //--------------------------------------------------------------------------------------------
  // returns as array of movies in json format for page requested
  //--------------------------------------------------------------------------------------------
  export const getMoviesPage = async ( args) => {
    const [, { page }] = args.queryKey;
    console.log("API: " + page);
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
    );
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  };
  
  //--------------------------------------------------------------------------------------------  
  // Returns the movie details based on a movie id.
  //--------------------------------------------------------------------------------------------
  export const getMovie = async ( args ) => {
    console.log(args)
    // eslint-disable-next-line no-unused-vars
    const [prefix, { id }] = args.queryKey;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    );
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  };

   //--------------------------------------------------------------------------------------------  
   // Returns the person details based on a person id.
   //--------------------------------------------------------------------------------------------
   export const getPerson = async ( args ) => {
    console.log(args)
    // eslint-disable-next-line no-unused-vars
    const [prefix, { id }] = args.queryKey;
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    );
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  };

  //--------------------------------------------------------------------------------------------
  //returns the cast of a given movie based on movie id
  //--------------------------------------------------------------------------------------------
  export const getMovieCast = async ( args ) => {
    // eslint-disable-next-line no-unused-vars
    const [prefix, { id }] = args.queryKey;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
    );
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  };

  //--------------------------------------------------------------------------------------------
  // returns the movies in which a person is involved, based on person id.
  //--------------------------------------------------------------------------------------------
  export const getCastMovies = async ( args ) => {
    // eslint-disable-next-line no-unused-vars
    const [prefix, { id }] = args.queryKey;
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&with_people=${id}`
    );
    if (!response.ok) {
      console.log("hello Error");
      throw new Error(response.json().message);
    }
    return response.json();
  };

  //--------------------------------------------------------------------------------------------
  // returns an array of genres 
  //--------------------------------------------------------------------------------------------
  export const getGenres = async () => {
    const response = await  fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=en-US"
    )
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  };
  
  //--------------------------------------------------------------------------------------------
  // returns an array of moview reviews based on movie id
  //--------------------------------------------------------------------------------------------
  export const getMovieReviews = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };

  //--------------------------------------------------------------------------------------------
  // returns an array of movie images based on movie id
  //--------------------------------------------------------------------------------------------
  export const getMovieImages = async ({queryKey}) => {
    // eslint-disable-next-line no-unused-vars
    const [prefix, { id }] = queryKey;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  };

  //--------------------------------------------------------------------------------------------
  // returns an array of upcoming movies.
  //--------------------------------------------------------------------------------------------
  export const getUpcomingMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
    );
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  };

    //--------------------------------------------------------------------------------------------
  // returns an array of upcoming movies by page.
  //--------------------------------------------------------------------------------------------
  export const getUpcomingMoviesPage = async (args) => {
    const [, { page }] = args.queryKey;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
    );
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  };


  //--------------------------------------------------------------------------------------------
  // returns a request Token json format
  //--------------------------------------------------------------------------------------------
  export const requestUserToken = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_TMDB_KEY}`);
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  };

  //--------------------------------------------------------------------------------------------
  // Authenticates the request Token
  //--------------------------------------------------------------------------------------------
  export const authenticateToken = async (requestToken) => {
    const response = await fetch(
      `https://thingproxy.freeboard.io/fetch/https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://www.themoviedb.org/authenticate/allow`);
    if (!response.ok) {
      throw new Error(response.json().message);
    };
    return response;
  };

  //--------------------------------------------------------------------------------------------
  // Authenticates the request Token
  //--------------------------------------------------------------------------------------------
  export const authenticateWithLogin = async (requestToken) => {

    const data ={
      "username": process.env.REACT_APP_TMDB_USERNAME,
      "password": process.env.REACT_APP_TMDB_PASSWORD,
      "request_token": requestToken,
    };
    console.log(data);

    const requestOption = {
      method: 'POST',
      headers: {  'Content-Type': 'application/json',
                  'Accept': 'application/json'},
      body: JSON.stringify(data)
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.REACT_APP_TMDB_KEY}`, requestOption);
    if (!response.ok) {
      throw new Error(response.json().message);
    };
    return response;
  };

  //--------------------------------------------------------------------------------------------
  // Create a session id which can be used to create lists
  //--------------------------------------------------------------------------------------------
  export const createSessionId = async (requestToken) => {
    const requestOptions = {
      method: 'POST',
      headers: {  'Content-Type': 'application/json',
                  'Accept': 'application/json'},
      body: JSON.stringify({"request_token": requestToken})
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_TMDB_KEY}`, requestOptions);
    if (!response.ok) {
      throw new Error(response.json().message);
    };
    return response.json();
    };

  //--------------------------------------------------------------------------------------------
  // Create a List using the session id
  //--------------------------------------------------------------------------------------------
  export const createNewList = async (sessionId, listName, listDescription) => {
    const requestOptions = {
      method: 'POST',
      headers: {  'Content-Type': 'application/json',
                  'Accept': 'application/json'},
      body: JSON.stringify({"name": listName, "description": listDescription, "language": "en"})
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/list?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`, requestOptions);
    if (!response.ok) {
      throw new Error(response.json().message);
    };
    return response.json();
  };

  //--------------------------------------------------------------------------------------------
  // Add to an existing TMDB List  
  //--------------------------------------------------------------------------------------------
  export const addToList = async (sessionId, listId, movieId) => {
    const requestOptions = {
      method: 'POST',
      headers: {  'Content-Type': 'application/json;charset=utf-8',
                  'Accept': 'application/json'},
      body: JSON.stringify({"media_id": movieId})
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/list/${listId}/add_item?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`, requestOptions);
    if (!response.ok) {
      throw new Error(response.json().message);
    };
    return response.json();
  };

  //--------------------------------------------------------------------------------------------
  // Remove movie from an existing TMDB List  
  //--------------------------------------------------------------------------------------------
  export const removeFromList = async (sessionId, listId, movieId) => {
    const requestOptions = {
      method: 'POST',
      headers: {  'Content-Type': 'application/json;charset=utf-8',
                  'Accept': 'application/json'},
      body: JSON.stringify({"media_id": movieId})
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/list/${listId}/remove_item?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`, requestOptions);
    if (!response.ok) {
      throw new Error(response.json().message);
    };
    return response.json();
  };

  //--------------------------------------------------------------------------------------------
  // Retrieve list data
  //--------------------------------------------------------------------------------------------
  export const retrieveListArray = async (listId) => {

    // eslint-disable-next-line no-unused-vars
    const response = await fetch(
      `https://api.themoviedb.org/3/list/${listId}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`);
    if (!response.ok) {
      throw new Error(response.json().message);
    };
    return response.json();
  };
  
  //--------------------------------------------------------------------------------------------
  // Check if item already in list data
  //--------------------------------------------------------------------------------------------
  export const checkListArray = async (listId, movieId) => {

    // eslint-disable-next-line no-unused-vars
    const response = await fetch(
      `https://api.themoviedb.org/3/list/${listId}/item_status?api_key=${process.env.REACT_APP_TMDB_KEY}&movie_id=${movieId}`);
    if (!response.ok) {
      throw new Error(response.json().message);
    };
    return response.json()
  };
