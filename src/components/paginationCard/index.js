import React, { useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { MoviesContext } from "../../contexts/moviesContext";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
      marginAutoItem: {
        margin: 'auto'
      },
    },
  },
}));

export default function PaginationCard({page}) {

  const classes = useStyles();
  const movieContext = useContext(MoviesContext);

  const handleChange = (event, value) => {
    movieContext.setHomePageNumber(value);
  };

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h4">Page: {movieContext.homePageNo}</Typography>
      <Pagination count={page} page={movieContext.homePageNo} onChange={handleChange} />
    </div>
  );
}