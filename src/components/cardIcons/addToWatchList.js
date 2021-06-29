import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@material-ui/core/IconButton";
import PlayListAddIcon from "@material-ui/icons/PlaylistAdd";

const AddToWatchListIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToWatchList = (e) => {
    e.preventDefault();
    context.addToMustWatch(movie);
    console.log(context.mustWatch);
  };
  return (
    <IconButton aria-label="add to Watch List" onClick={handleAddToWatchList}>
      <PlayListAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToWatchListIcon;