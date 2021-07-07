import React from "react";
import CastCard from "../castCard";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-around",
      },
      gridList: {
        flexWrap: 'nowrap',
        width: 1000,
        height: '100vh',
      },
      imageList: {
        flexWrap: 'nowrap',
        width: 1000,
        height: '100vh',
      },
    
  }));

const CastList = ( {castMembers, action }) => {
    const classes = useStyles();
  
        return (
        <Grid container spacing={5} style={{ padding: "10px" }}>
            <Grid item xs={12}>
                <div className={classes.root}>
                <GridList cellHeight={800} className={classes.gridList} rows={1}>
                    {castMembers.map((c) => (
                        <GridListTile className={classes.imageList}>
                            <CastCard key={c.id} cast={c} action={action} />
                        </GridListTile> 
                    ))}
                </GridList>
                </div>
            </Grid>
        </Grid>
        );  
    
  };

export default CastList;