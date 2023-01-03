import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Link, NavLink } from "react-router-dom";
import { Box, Stack, Theme } from "@mui/material";

import { useAppContext } from "../../contexts/AppProvider";
import { Hamburger, Moon, Sun } from "../../assets/icons";
import { useAppSelector } from "../../hooks";
import { zapi } from "../../assets/svg";
import { Button } from "../";

const LINKS = [
  { name: "Home", to: "/" },
  { name: "API Hub", to: "/api-hub" },
  { name: "Pricing", to: "/pricing" },
  { name: "Documentation", to: "/documentation" },
];

const Navbar = () => {
  const {
    handleClicked,
    currentMode,
    setMode,
    setActiveMenu,
    screenSize,
    setScreenSize,
  } = useAppContext();
  const { isLoggedIn } = useAppSelector((store) => store.auth);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const classes = useStyles();

  const handleScroll = () => {
    const offset = window.scrollY;
    offset > 700 ? setScrolled(true) : setScrolled(false);
  };

  useEffect(() => {
    const handleScreenResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleScreenResize);
    handleScreenResize();
    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  useEffect(() => {
    screenSize > 1260 && setActiveMenu(false);
  }, [screenSize]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <Box
      className={classes.root}
      style={{ position: scrolled ? "fixed" : "static" }}>
      <Link to="/" className={classes.logo}>
        <img src={zapi} alt="zapi logo" />
        <p>ZAPI</p>
      </Link>
      <Box className={classes.toolbar}>
        <Stack direction="row" alignItems="center" spacing="40px">
          {LINKS.map((_, index) => (
            <NavLink
              key={index}
              to={_.to}
              className={({ isActive }) =>
                isActive ? classes.activeLink : classes.inactiveLink
              }>
              {_.name}
            </NavLink>
          ))}
        </Stack>
        {!isLoggedIn ? (
          <Stack direction="row" alignItems="center" spacing="24px">
            <Link to="/login" style={{color: "#FFF",padding: "8px 12px 8px 16px"}}>Login</Link>
            <Button
              label="Sign Up"
              to="/signup"
              variant="secondary"
              size="small"
            />
            {currentMode === "light" ? (
              <Moon fill="#E9EBED" onClick={() => setMode("dark")} />
            ) : (
              <Sun fill="#E9EBED" onClick={() => setMode("light")} />
            )}
          </Stack>
        ) : (
          <Stack direction="row" alignItems="center" spacing="24px">
            <Button
              label="Dashboard"
              variant="text"
              size="small"
              to="/developer/dashboard"
            />
            <Button
              label="Logout"
              variant="secondary"
              size="small"
              onClick={() => handleClicked("logout")}
            />
            {currentMode === "light" ? (
              <Moon onClick={() => setMode("dark")} />
            ) : (
              <Sun onClick={() => setMode("light")} />
            )}
          </Stack>
        )}
      </Box>
      <Box className={classes.menuToggle}>
        <Hamburger onClick={() => setActiveMenu(true)} />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "88px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    background: theme.palette.primary.main,
    padding: "24px 3rem",
    top: 0,
    left: 0,
    zIndex: "10 !important",
    [theme.breakpoints.down("laptop")]: {
      padding: "24px 32px",
    },
    [theme.breakpoints.down("tablet")]: {
      padding: "24px 16px",
    },
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "219px",
    [theme.breakpoints.down("laptop")]: {
      display: "none",
    },
  },
  menuToggle: {
    display: "none",
    [theme.breakpoints.down("laptop")]: {
      display: "block",
    },
  },
  logo: {
    width: "130px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    "& p": {
      fontWeight: 700,
      fontSize: "23px",
      lineHeight: "28px",
      color: "#FFF",
    },
  },
  activeLink: {
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
    color: theme.palette.secondary.main,
  },
  inactiveLink: {
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
    color: theme.palette.grey[300],
    "&:hover": {
      color: "#FFF",
    },
  },
  icon: {
    width: "48px",
    height: "48px",
  },
}));

export default Navbar;
