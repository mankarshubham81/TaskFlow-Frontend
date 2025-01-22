"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogoutUserMutation } from "@/lib/services/auth";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Menu as MenuIcon, Home, Person, Lock, Logout, Task } from "@mui/icons-material";
import TaskPage from './../app/user/task/page';

const UserTopBar = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [logoutUser] = useLogoutUserMutation();
  const router = useRouter();

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.data && response.data.status === "success") {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const navigationItems = [
    { text: "Home", icon: <Home />, href: "/" },
    { text: "Profile", icon: <Person />, href: "/user/profile" },
    { text: "Task", icon: <Task />, href: "/user/task" },
    { text: "Change Password", icon: <Lock />, href: "/user/change-password" },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Top App Bar */}
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

          {/* Navigation Links (For Larger Screens) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                component={Link}
                href={item.href}
                color="inherit"
                startIcon={item.icon}
                sx={{ textTransform: "none", fontWeight: "bold" }}
              >
                {item.text}
              </Button>
            ))}
            <Button
              onClick={handleLogout}
              color="inherit"
              startIcon={<Logout />}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Logout
            </Button>
          </Box>

          {/* Menu Icon (For Smaller Screens) */}
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

      {/* Dropdown Menu (For Smaller Screens) */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        keepMounted
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {navigationItems.map((item, index) => (
          <MenuItem
            key={index}
            component={Link}
            href={item.href}
            onClick={handleMenuClose}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {item.icon}
              {item.text}
            </Box>
          </MenuItem>
        ))}
        <MenuItem onClick={handleLogout}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Logout />
            Logout
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserTopBar;
