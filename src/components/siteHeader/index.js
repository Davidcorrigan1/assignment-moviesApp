import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";

import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withRouter } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { AuthContext } from "../../contexts/authContext";
import { MoviesContext } from "../../contexts/moviesContext";



const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
}));

const SiteHeader = ( { history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const context = useContext(AuthContext);
  const moviesContext = useContext(MoviesContext);
  let menuOptions = [];
  
  if (context.isAuthenticated) {
    menuOptions = [
      { label: "Home", path: "/" },
      { label: "Upcoming", path: "/movies/upcoming"},
      { label: "Favorites", path: "/movies/favorites" },
      { label: "Must-Watch", path: "/movies/watched" },
      { label: "Search", path: "/search" },
      { label: "Sign-Out", path: "/signout" },
    ];
  } else {
    menuOptions = [
      { label: "Home", path: "/" },
      { label: "Upcoming", path: "/movies/upcoming"},
      { label: "Favorites", path: "/movies/favorites" },
      { label: "Must-Watch", path: "/movies/watched" },
      { label: "Search", path: "/search" },
      { label: "Sign-In", path: "/signin" },
      { label: "Sign-Up", path: "/signup" },
      { label: "Sign-Out", path: "/signout" },
    ];
  }
  

  const handleMenuSelect = async (pageURL) => {
    if (pageURL === "/signout") {
      context.signout();
      await moviesContext.resetFavorites();
      await moviesContext.resetMustWatch();
      pageURL = "/"
    }
    history.push(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            TMDB Client
          </Typography>
          <Typography variant="h6" className={classes.title}>
            {context.currentUser.authDisplayName ? (
              <AccountCircleIcon/> 
              ) : (<></>)}
            {context.currentUser.authDisplayName}
          </Typography>
          <Typography variant="h6" className={classes.title}>
            All you ever wanted to know about Movies!
          </Typography>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </>
            )}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default withRouter(SiteHeader);