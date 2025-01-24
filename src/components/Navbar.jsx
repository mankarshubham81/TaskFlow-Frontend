"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from '@/context/ThemeContext';
import { useLogoutUserMutation } from "@/lib/services/auth";
import { 
  AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Box, Button,
  useMediaQuery, useTheme as useMuiTheme, styled 
} from "@mui/material";
import { 
  Menu as MenuIcon, 
  Home, 
  Person, 
  Lock, 
  Logout, 
  Task, 
  Brightness4, 
  Brightness7,
  Login,
  HowToReg
} from "@mui/icons-material";
import Cookies from "js-cookie";
import LoadingSpinner from "./LoadingSpinner";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  transition: 'all 0.3s ease',
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  backdropFilter: 'blur(8px)',
}));

const NavButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
  },
}));

const AnimatedThemeIcon = styled(Box)({
  transition: 'transform 0.3s ease',
});

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const router = useRouter();
  
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [isAuth, setIsAuth] = useState(null);
  const [logoutUser] = useLogoutUserMutation();

  const navigationItems = isAuth ? [
    { text: "Home", icon: <Home />, href: "/" },
    { text: "Profile", icon: <Person />, href: "/user/profile" },
    { text: "Tasks", icon: <Task />, href: "/user/task" },
    { text: "Security", icon: <Lock />, href: "/user/change-password" },
  ] : [
    { text: "Home", icon: <Home />, href: "/" },
    { text: "Login", icon: <Login />, href: "/account/login" },
    { text: "Register", icon: <HowToReg />, href: "/account/register" },
  ];

  useEffect(() => {
    setIsAuth(!!Cookies.get("is_auth"));
  }, []);

  const handleMenuOpen = (event) => setMenuAnchor(event.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      
      // Remove all client-side cookies with matching server settings
      Cookies.remove('is_auth', { path: '/' });
      Cookies.remove('accessToken', { path: '/' });
      Cookies.remove('refreshToken', { path: '/' });
      
      // Force state update and redirect
      setIsAuth(false);
      router.push('/');
      router.refresh(); // Ensure client cache is cleared
      
    } catch (error) {
      console.error("Logout failed:", error);
      // Consider adding error toast notification
    }
  };

  if (isAuth === null) return <LoadingSpinner />;

  return (
    <StyledAppBar 
      position="sticky"
      sx={{ 
        bgcolor: isDarkMode ? 'background.default' : 'primary.main',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            flexGrow: 1,
            fontWeight: 800,
            letterSpacing: 1.2,
            textDecoration: 'none',
            color: isDarkMode ? 'text.primary' : 'common.white',
            fontFamily: "'Inter', sans-serif",
            '&:hover': { opacity: 0.9 }
          }}
        >
          TaskFlow
        </Typography>

        {!isMobile ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <IconButton 
              onClick={toggleTheme}
              sx={{
                color: 'inherit',
                '&:hover': { transform: 'rotate(180deg)' }
              }}
            >
              <AnimatedThemeIcon>
                {isDarkMode ? (
                  <Brightness7 sx={{ color: 'warning.main' }} />
                ) : (
                  <Brightness4 sx={{ color: 'common.white' }} />
                )}
              </AnimatedThemeIcon>
            </IconButton>

            {navigationItems.map((item) => (
              <NavButton
                key={item.text}
                component={Link}
                href={item.href}
                startIcon={item.icon}
                sx={{
                  color: 'inherit',
                  '&:hover': {
                    bgcolor: isDarkMode ? 'action.hover' : 'rgba(255,255,255,0.1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }
                }}
              >
                {item.text}
              </NavButton>
            ))}

            {isAuth && (
              <NavButton
                onClick={handleLogout}
                startIcon={<Logout />}
                sx={{
                  color: 'inherit',
                  '&:hover': {
                    bgcolor: 'error.dark',
                    boxShadow: '0 4px 12px rgba(244,67,54,0.2)'
                  }
                }}
              >
                Logout
              </NavButton>
            )}
          </Box>
        ) : (
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        MenuListProps={{ sx: { py: 0 } }}
        PaperProps={{
          sx: {
            bgcolor: isDarkMode ? 'background.paper' : 'background.default',
            minWidth: 200,
            border: `1px solid ${muiTheme.palette.divider}`,
          }
        }}
      >
        <MenuItem onClick={toggleTheme}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 1, width: '100%' }}>
            {isDarkMode ? (
              <Brightness7 sx={{ color: 'warning.main' }} />
            ) : (
              <Brightness4 />
            )}
            <Typography variant="body2">
              {isDarkMode ? 'Light Theme' : 'Dark Theme'}
            </Typography>
          </Box>
        </MenuItem>

        {navigationItems.map((item) => (
          <MenuItem
            key={item.text}
            component={Link}
            href={item.href}
            onClick={handleMenuClose}
            sx={{
              py: 1.5,
              borderBottom: `1px solid ${muiTheme.palette.divider}`,
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {item.icon}
              <Typography variant="body2">{item.text}</Typography>
            </Box>
          </MenuItem>
        ))}

        {isAuth && (
          <MenuItem 
            onClick={handleLogout}
            sx={{
              py: 1.5,
              bgcolor: 'error.light',
              '&:hover': { bgcolor: 'error.main', color: 'common.white' }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Logout fontSize="small" />
              <Typography variant="body2">Logout</Typography>
            </Box>
          </MenuItem>
        )}
      </Menu>
    </StyledAppBar>
  );
};

export default Navbar;