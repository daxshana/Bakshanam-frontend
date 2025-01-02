import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Badge, Box, Popover, useMediaQuery } from '@mui/material';
import { ShoppingCart, Menu as MenuIcon, ExitToApp } from '@mui/icons-material';
import { useCart } from '../component/CartContexrprovider';
import logo from '../img/BHAKSHANAM (1).png';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const navButtonStyle = {
    color: 'black',
    margin: '0 8px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#f56e0f',
      color: '#fff',
    },
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: '#E6E6E6',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        color: '#333',
        borderRadius: '0px',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '60px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <img
            src={logo}
            alt="Bhakshanam Logo"
            style={{ height: '50px', marginRight: '10px' }}
          />
          {!isSmallScreen && (
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', fontSize: '1.2rem' }}>
              Bhakshanam
            </Typography>
          )}
        </Link>

        {!isSmallScreen ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button sx={navButtonStyle}>Home</Button>
            </Link>
            <Link to="/Menu" style={{ textDecoration: 'none' }}>
              <Button sx={navButtonStyle}>Menu</Button>
            </Link>
            <Link to="/Contactus" style={{ textDecoration: 'none' }}>
              <Button sx={navButtonStyle}>Contact Us</Button>
            </Link>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              <Button sx={navButtonStyle}>Profile</Button>
            </Link>
          </Box>
        ) : (
          <IconButton onClick={handleMenuClick} sx={{ color: '#333' }}>
            <MenuIcon />
          </IconButton>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton component={Link} to="/cart" sx={{ marginLeft: '8px' }}>
            <Badge
              badgeContent={cart.length}
              color="secondary"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#f56e0f',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                },
              }}
            >
              <ShoppingCart sx={{ color: '#333' }} />
            </Badge>
          </IconButton>

          {isLoggedIn ? (
            <IconButton onClick={handleLogout} sx={{ color: '#333', marginLeft: '8px' }}>
              <ExitToApp />
            </IconButton>
          ) : (
            <>
              <Link to="/Homemaker" style={{ textDecoration: 'none' }}>
                <Button sx={navButtonStyle}>Homemaker</Button>
              </Link>
              <Link to="/Signup" style={{ textDecoration: 'none' }}>
                <Button
                  sx={{
                    ...navButtonStyle,
                    backgroundColor: '#f56e0f',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#d44f4f',
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </Box>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={handleMenuClose}
                sx={{
                  color: '#333',
                  backgroundColor: 'transparent',
                  fontWeight: 'bold',
                  '&:hover': {
                    color: '#f56e0f',
                    backgroundColor: 'rgba(245, 110, 15, 0.1)',
                  },
                }}
              >
                Close
              </Button>
            </Box>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button sx={{ ...navButtonStyle, width: '100%', justifyContent: 'flex-start' }}>Home</Button>
            </Link>
            <Link to="/Menu" style={{ textDecoration: 'none' }}>
              <Button sx={{ ...navButtonStyle, width: '100%', justifyContent: 'flex-start' }}>Menu</Button>
            </Link>
            <Link to="/Contactus" style={{ textDecoration: 'none' }}>
              <Button sx={{ ...navButtonStyle, width: '100%', justifyContent: 'flex-start' }}>Contact Us</Button>
            </Link>
            {isLoggedIn ? (
              <Button onClick={handleLogout} sx={{ ...navButtonStyle, width: '100%', justifyContent: 'flex-start' }}>Log Out</Button>
            ) : (
              <>
                <Link to="/Homemaker" style={{ textDecoration: 'none' }}>
                  <Button sx={{ ...navButtonStyle, width: '100%', justifyContent: 'flex-start' }}>Homemaker</Button>
                </Link>
                <Link to="/Signup" style={{ textDecoration: 'none' }}>
                  <Button
                    sx={{
                      width: '100%',
                      backgroundColor: '#f56e0f',
                      color: 'white',
                      justifyContent: 'flex-start',
                      '&:hover': {
                        backgroundColor: '#d44f4f',
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
