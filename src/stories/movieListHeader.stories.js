import React from "react";
import { MemoryRouter } from "react-router";
import MovieListHeader from "../components/headerMovieList";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Home Page/Header",
  component: MovieListHeader,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => <MovieListHeader title={'Discover Movies'} />;

Basic.storyName = "Default";