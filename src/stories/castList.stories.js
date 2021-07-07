import React from "react";
import CastList from "../components/castList";
import SampleCast from "./sampleCastData";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Grid from "@material-ui/core/Grid";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Cast Page/CastList",
  component: CastList,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  const castMembers = [
    { ...SampleCast, id: 1 },
    { ...SampleCast, id: 2 },
    { ...SampleCast, id: 3 },
    { ...SampleCast, id: 4 },
    { ...SampleCast, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <CastList
        castMembers={castMembers}
        action={(c) => <AddToFavoritesIcon movie={c} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";
