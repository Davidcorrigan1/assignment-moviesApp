import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import SearchPage from "./pages/searchPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage"; // NEW
import WatchedMoviesPage from "./pages/watchedMoviesPage"; // for Watch List page
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import AppearedInMoviesPage from "./pages/appearedInMoviesPage";
import SignupPage from "./pages/signupPage";
import SigninPage from "./pages/signinPage"; 
import AuthProvider from "./contexts/authContext";
import PrivateRoute from "./components/privateRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <AuthProvider>
      <MoviesContextProvider>
        <SiteHeader />      {/* New Header  */}
            {" "}
            <Switch>
              <Route exact path="/reviews/form" component={AddMovieReviewPage} />
              <PrivateRoute exact path="/movies/upcoming" component={UpcomingMoviesPage} />
              <PrivateRoute path="/reviews/:id" component={MovieReviewPage} />
              <PrivateRoute path="/movies/favorites" component={FavoriteMoviesPage} />
              <PrivateRoute exact path="/movies/watched" component={WatchedMoviesPage} />
              <PrivateRoute path="/movies/:id" component={MoviePage} />
              <PrivateRoute path="/appearedInmovies/:id" component={AppearedInMoviesPage} />
              <PrivateRoute exact path="/search" component={SearchPage} />
              <Route path="/signup" component={SignupPage} />
              <Route path="/signin" component={SigninPage} />
              <Route exact path="/" component={HomePage} />
              <Redirect from="*" to="/" />
            </Switch> 
          </MoviesContextProvider>
      </AuthProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


ReactDOM.render(<App />, document.getElementById("root"));