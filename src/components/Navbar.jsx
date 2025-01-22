"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Box, Button } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import LoadingIndicator from "./LoadingIndicator";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  useEffect(() => {
    const authCookie = Cookies.get("is_auth");
    setIsAuth(authCookie);
  }, []);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <>
      {isAuth === null && <LoadingIndicator />}
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }}
          >
            Taskflow
          </Typography>

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button component={Link} href="/" color="inherit" sx={{ textTransform: "none", fontWeight: "bold" }}>
              Home
            </Button>
            {isAuth ? (
              <Button
                component={Link}
                href="/user/task"
                color="inherit"
                sx={{ textTransform: "none", fontWeight: "bold" }}
              >
                Task
              </Button>
            ) : (
              <>
                <Button
                  component={Link}
                  href="/account/login"
                  color="inherit"
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  href="/account/register"
                  color="inherit"
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                >
                  Registration
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Dropdown Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        keepMounted
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <MenuItem component={Link} href="/" onClick={handleMenuClose}>
          Home
        </MenuItem>
        {
          isAuth &&
          <MenuItem component={Link} href="/user/task" onClick={handleMenuClose}>
            task
          </MenuItem>
        }
        {isAuth ? (
          <MenuItem component={Link} href="/user/profile" onClick={handleMenuClose}>
            Profile
          </MenuItem>
        ) : (
          <>
            <MenuItem component={Link} href="/account/login" onClick={handleMenuClose}>
              Login
            </MenuItem>
            <MenuItem component={Link} href="/account/register" onClick={handleMenuClose}>
              Registration
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

export default Navbar;
