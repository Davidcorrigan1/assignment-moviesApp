import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
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
import LoginPage from "./pages/loginPage";
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
        <SiteHeader />      {/* New Header  */}
        <AuthProvider>
          <MoviesContextProvider>
            {" "}
            <Switch>
              <Route exact path="/reviews/form" component={AddMovieReviewPage} />
              <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} />
              <Route path="/reviews/:id" component={MovieReviewPage} />
              <PrivateRoute path="/movies/favorites" component={FavoriteMoviesPage} />
              <Route exact path="/movies/watched" component={WatchedMoviesPage} />
              <Route path="/movies/:id" component={MoviePage} />
              <Route path="/appearedInmovies/:id" component={AppearedInMoviesPage} />
              <Route path="/login" component={LoginPage} />
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