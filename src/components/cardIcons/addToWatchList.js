import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";
import IconButton from "@material-ui/core/IconButton";
import PlayListAddIcon from "@material-ui/icons/PlaylistAdd";
import { useHistory } from "react-router-dom";

const AddToWatchListIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const handleAddToWatchList = (e) => {
    e.preventDefault();
    if (authContext.isAuthenticated) {    
        context.addToMustWatch(movie);
    } else {
        history.push("/signin");
    }
  };
  return (
    <IconButton aria-label="add to Watch List" onClick={handleAddToWatchList}>
      <PlayListAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToWatchListIcon;