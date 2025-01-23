"use client";
import { useState } from "react";
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
  Brightness7 
} from "@mui/icons-material";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  transition: 'all 0.3s ease',
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const NavButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
  },
}));

const AnimatedMenuIcon = styled(Brightness4)({
  transition: 'transform 0.3s ease',
});

const UserTopBar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [logoutUser] = useLogoutUserMutation();
  const router = useRouter();

  const navigationItems = [
    { text: "Home", icon: <Home />, href: "/" },
    { text: "Profile", icon: <Person />, href: "/user/profile" },
    { text: "Tasks", icon: <Task />, href: "/user/task" },
    { text: "Security", icon: <Lock />, href: "/user/change-password" },
  ];

  const handleMenu = (event) => setMenuAnchor(event.currentTarget);
  const closeMenu = () => setMenuAnchor(null);

  const handleLogout = async () => {
    try {
      const { data } = await logoutUser().unwrap();
      data?.status === "success" && router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <StyledAppBar 
      position="sticky" 
      color="inherit"
      sx={{ 
        bgcolor: isDarkMode ? 'background.default' : 'primary.main',
        backdropFilter: 'blur(8px)',
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
            textShadow: isDarkMode 
              ? '0 2px 4px rgba(0,0,0,0.1)' 
              : '0 2px 4px rgba(255,255,255,0.1)',
            '&:hover': {
              opacity: 0.9,
            }
          }}
        >
          TaskFlow
        </Typography>

        {!isMobile && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 3,
            '& > *': {
              transition: 'all 0.3s ease'
            }
          }}>
            <IconButton 
              onClick={toggleTheme} 
              color="inherit"
              sx={{
                '&:hover': {
                  transform: 'rotate(180deg)'
                }
              }}
            >
              {isDarkMode ? (
                <Brightness7 sx={{ color: 'warning.main' }} />
              ) : (
                <AnimatedMenuIcon sx={{ color: 'common.white' }} />
              )}
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
                  },
                  '& .MuiButton-startIcon': {
                    transition: 'transform 0.2s ease'
                  },
                  '&:hover .MuiButton-startIcon': {
                    transform: 'scale(1.1)'
                  }
                }}
              >
                {item.text}
              </NavButton>
            ))}

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
          </Box>
        )}

        {isMobile && (
          <IconButton 
            color="inherit" 
            onClick={handleMenu}
            sx={{
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
        MenuListProps={{
          sx: {
            py: 0,
            overflow: 'hidden',
          }
        }}
        PaperProps={{
          sx: {
            bgcolor: isDarkMode ? 'background.paper' : 'background.default',
            minWidth: 200,
            boxShadow: 4,
            border: `1px solid ${muiTheme.palette.divider}`,
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem 
          onClick={toggleTheme}
          sx={{
            bgcolor: 'action.selected',
            '&:hover': {
              bgcolor: 'action.hover'
            }
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            px: 1,
            py: 1.5,
            width: '100%'
          }}>
            {isDarkMode ? (
              <Brightness7 sx={{ color: 'warning.main' }} />
            ) : (
              <Brightness4 sx={{ color: 'text.primary' }} />
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
            onClick={closeMenu}
            sx={{
              py: 1.5,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'action.hover',
                paddingLeft: '24px'
              },
              '&:not(:last-child)': {
                borderBottom: `1px solid ${muiTheme.palette.divider}`
              }
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              color: 'text.primary'
            }}>
              {item.icon}
              <Typography variant="body2">{item.text}</Typography>
            </Box>
          </MenuItem>
        ))}

        <MenuItem 
          onClick={handleLogout}
          sx={{
            py: 1.5,
            bgcolor: 'error.light',
            '&:hover': {
              bgcolor: 'error.main',
              color: 'common.white'
            }
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            width: '100%'
          }}>
            <Logout fontSize="small" />
            <Typography variant="body2">Logout</Typography>
          </Box>
        </MenuItem>
      </Menu>
    </StyledAppBar>
  );
};

export default UserTopBar;