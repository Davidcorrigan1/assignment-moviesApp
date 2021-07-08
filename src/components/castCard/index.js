import React, { useContext  } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import img from '../../images/film-poster-placeholder.png';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: "50%"
  },

  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    scale: '100'
  },

  title: {
    fontSize: 25,
  },
});

export default function CastCard({ cast, action }) {
  const classes = useStyles();

  return (
    <GridListTile key={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}>
            <img src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`} alt={img} />
            <GridListTileBar
              title={cast.name}
              subtitle={cast.character}
              titlePosition='top'
              classes={{
                root: classes.titleBar,
                title: classes.title,
                subtitle: classes.title,
                width: classes.width
              }}
              actionIcon={
                <Link to={`/appearedInmovies/${cast.id}`}>
                <Button  variant="contained" size="medium" color="primary">
                  MOVIES
                </Button>
              </Link>
              }
            
            />
    </GridListTile>

   
  );
}