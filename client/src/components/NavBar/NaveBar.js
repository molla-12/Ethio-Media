import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
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

    return (
        <AppBar className={ classes.appBar } position="static" color="inherit">
            <div className={ classes.brandContainer }>
                <Typography component={ Link } to="/" className={ classes.heading } variant="h2" align="center">MERN STACK</Typography>
            </div>
            <Toolbar className={ classes.toolbar }>
                { user ? (<div className={ classes.profile }>
                    <Avatar className={ classes.purple } alt={ user.result.name } src={ user.result.imageUrl }>
                        { user.result.name.charAt(0) }</Avatar>
                    <Typography className={ classes.userName } variant="h3" color="secondary">{ user.result.name }</Typography>
                    <Button variant="contained" className={ classes.logout } onClick={ logout }>LogOut</Button>
                </div>) :
                    (<div>
                        <Button component={ Link } to="/auth" variant="contained" color="primary">sign IN</Button>
                    </div>)
                }
            </Toolbar>
        </AppBar >
    );
}

export default NaveBar;

