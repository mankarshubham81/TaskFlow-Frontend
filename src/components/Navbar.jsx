"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from '@/context/ThemeContext';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Box, Button } from "@mui/material";
import { Menu as MenuIcon, Brightness4, Brightness7 } from "@mui/icons-material";
import LoadingIndicator from "./LoadingIndicator";
import Cookies from "js-cookie";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
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
      <AppBar 
        position="static" 
        color="inherit"
        sx={{ 
          bgcolor: isDarkMode ? 'background.paper' : 'primary.main',
          boxShadow: 'none',
          borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{ 
              flexGrow: 1, 
              fontWeight: "bold",
              textDecoration: 'none',
              color: isDarkMode ? 'text.primary' : 'common.white'
            }}
          >
            TaskFlow
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: 'center' }}>
            <IconButton onClick={toggleTheme} color="inherit">
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <Button component={Link} href="/" color="inherit">
              Home
            </Button>
            {isAuth ? (
              <Button component={Link} href="/user/task" color="inherit">
                Tasks
              </Button>
            ) : (
              <>
                <Button component={Link} href="/account/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} href="/account/register" color="inherit">
                  Register
                </Button>
              </>
            )}
          </Box>

          <IconButton
            edge="start"
            color="inherit"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        sx={{ 
          '& .MuiPaper-root': {
            bgcolor: isDarkMode ? 'background.paper' : 'background.default',
            minWidth: 200
          }
        }}
      >
        <MenuItem onClick={toggleTheme}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </Box>
        </MenuItem>
        <MenuItem component={Link} href="/" onClick={handleMenuClose}>
          Home
        </MenuItem>
        {isAuth && (
          <MenuItem component={Link} href="/user/task" onClick={handleMenuClose}>
            Tasks
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Navbar;