import React from "react";
import CastCard from "../castCard";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-around",
      },
      gridList: {
        flexWrap: 'nowrap',
        width: "100%",
        height: '70vh',
        
      },
    
  }));

const CastList = ( {castMembers }) => {
    const classes = useStyles();
  
        return (
        <Grid container spacing={5}  style={{ padding: "10px" }}>
            <Grid item xs={12} >
                <div className={classes.root}>
                <GridList className={classes.gridList} >
                    {castMembers.map((c) => (
                        <CastCard key={c.id} cast={c}  />
                    ))}
                </GridList>
                </div>
            </Grid>
        </Grid>
        );  
    
  };

export default CastList;