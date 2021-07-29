import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Spinner from '../spinner';
import { getGenres, getCertifications } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: theme.spacing(1.5),
    margin: 0,
  },
  tagLine: {
    fontSize: "1.5rem",
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SearchHeader = ( { movie, history}) => {
  const classes = useStyles();

  const [genre, setGenre] = useState('');
  const [certificate, setCertificate] = useState('');
  const [year, setYear] = useState('');

  const { data: genreData, error: genreError, isLoading: genreIsLoading, isError: genreIsError } = useQuery("genres", getGenres);
  const { data: certData, error: certError, isLoading: certIsLoading, isError: certIsError } = useQuery("certificates", getCertifications);

  if (genreIsLoading || certIsLoading) {
    return <Spinner />;
  }

  if (genreIsError) {
    return <h1>{genreError.message}</h1>;
  } else if (certIsError) {
      return <h1>{certError.message}</h1>
  }

  const genres = genreData.genres;
  if (genres[0].name!=='All') {
    genres.unshift({ id: "0", name: "All" });
  }

  const {"GB" :certifications} = certData.certifications;
  if (certifications[0].certification!=='All') {
    certifications.unshift({ id: "0", certification: "All" });
  }

  const generateArrayOfYears = (number) => {
      const max = new Date().getFullYear();
      const min = max - number;
      const years = [];

      for (let i = max; i >= min; i--) {
          years.push(i);
      }
      return years;
  }
  const yearsArray = generateArrayOfYears(20);

  const handleChange = (event, type, value) => {
        if (type === "genre") 
            setGenre(value);
        else if (type === "cert") {
            setCertificate(value);
        } else {
            setYear(value);
        }
    };
  

  const handleChangeCert = (event) => {
    handleChange(event, "cert", event.target.value);
  };

  const handleChangeGenre = (event) => {
    handleChange(event, "genre", event.target.value);
  };

  const handleChangeYear = (event) => {
    handleChange(event, "year", event.target.value);
  };

  return (
    <Paper component="div" className={classes.root}>

      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Genre</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={genre}
          onChange={handleChangeGenre}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.name}>
                  {genre.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Release Year</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={year}
          onChange={handleChangeYear}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {yearsArray.map((y) => {
              return (
                <MenuItem key={y.id} value={y}>
                  {y}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Certification</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={certificate}
          onChange={handleChangeCert}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {certifications.map((c) => {
              return (
                <MenuItem key={c.id} value={c.certification}>
                  {c.certification}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>

    </Paper>
  );
};

export default withRouter(SearchHeader);