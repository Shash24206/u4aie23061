import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { Log } from '../../../logging_middleware/src/index.js';

const Navbar = () => {
  const handleNavClick = async (label) => {
    await Log('frontend', 'info', 'component', `User navigated to ${label}`);
  };

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Campus Notifications
        </Typography>
        <Box>
          <Link href="/" passHref>
            <Button color="inherit" onClick={() => handleNavClick('Dashboard')}>Dashboard</Button>
          </Link>
          <Link href="/notifications" passHref>
            <Button color="inherit" onClick={() => handleNavClick('All Notifications')}>Notifications</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
