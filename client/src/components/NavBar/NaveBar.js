import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography, Menu, MenuItem, Divider } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import Settings from '@material-ui/icons/Settings';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from './styles';

const NaveBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')));

  }, [location]);

  const [anchorEl, setAnchorEl] = useState(null | HTMLElement);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className={ classes.appBar } position="static" color="inherit">
      <div className={ classes.brandContainer }>
        <Typography component={ Link } to="/" className={ classes.heading } variant="h2" align="center">Welcome</Typography>
      </div>
      <Toolbar className={ classes.toolbar }>
        { user ? (<div className={ classes.profile }>
          <Button
            id="basic-button"
            aria-controls={ open ? 'basic-menu' : undefined }
            aria-haspopup="true"
            aria-expanded={ open ? 'true' : undefined }
            onClick={ handleClick }
          >
            <Avatar className={ classes.purple } alt={ user.result.name } src={ user.result.imageUrl }>
              { user.result.name.charAt(0) }</Avatar>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={ anchorEl }
            open={ open }
            onClose={ handleClose }
            MenuListProps={ {
              'aria-labelledby': 'basic-button',
            } }
          >
            <MenuItem onClick={ handleClose }>{ user.result.name }</MenuItem>
            <MenuItem onClick={ logout }><PersonIcon fontSize="small" />Logout</MenuItem>
            <Divider />
            <MenuItem>
              <PersonIcon>
              </PersonIcon>
              Add account
            </MenuItem>
            <MenuItem>
              <Settings fontSize="small" />
              Settings
            </MenuItem>
          </Menu>
          <Typography className={ classes.userName } variant="body1" color="secondary">{ user.result.name }</Typography>
        </div>) :
          (<div>
            <Button component={ Link } to="/auth" variant="contained" color="primary">Sign IN</Button>
          </div>)
        }
      </Toolbar>
    </AppBar >
  );
}

export default NaveBar;
