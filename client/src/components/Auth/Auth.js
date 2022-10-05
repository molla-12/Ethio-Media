import React, { useState,useEffect } from 'react';
import { Avatar, Button, Grid, Typography, Paper, Container, Box } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch ,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
const Auth = () => {
    const [showPassword, setShowPasseword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const error =useSelector((state)=>state?.error);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const classes = useStyles();
    const state = null;
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            navigate('/', { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);

    };


    const switchMode = () => setIsSignUp((prevSwitchMode) => !prevSwitchMode);

    const handleShowPassword = () => setShowPasseword((prevShowPassword) => !prevShowPassword);

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={ classes.paper } elevation={ 3 }>
                <Avatar className={ classes.avatar }>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{ isSignUp ? 'SignUp' : 'SignIn' }</Typography>
                <form className={ classes.form } onSubmit={ handleSubmit }>
                    {/* { error && <Box spacing={ 2 } mb={ 2 }>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            { error?.response?.data?.message } <strong>check it out!</strong>
                        </Alert></Box> } */}

                    <Grid container spacing={ 2 }>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" placeholder='Name' label="First Name" handleChange={ handleChange } autoFocus half />
                                    <Input name="lastName" placeholder="Lase Name" label="Last Name" handleChange={ handleChange } half />
                                </>
                            ) }
                        <Input name="email" label="Email" placeholder="Email" handleChange={ handleChange } type="email" fullWidth />
                        <Input name="password" label="Password" placeholder="Password" handleChange={ handleChange } type={ showPassword ? 'text' : 'password' } handleShowPassword={ handleShowPassword } fullWidth />
                        { isSignUp && <Input name="confirmPassword" label="Repet password" placeholder="Repet password" handleChange={ handleChange } type="password" fullWidth /> }
                    </Grid>
                    <Button className={ classes.submit } type="submit" variant="contained" color="primary" fullWidth onClick={ handleSubmit } > { isSignUp ? "SignUp" : "SignIn" } </Button>
                    {/* <GoogleLogin
                        clientId="555737499533-kcrt3p9m16rghjpg7jtvqarpn7b7kn32.apps.googleusercontent.com"
                        render={ (renderProps) => (
                            <Button className={ classes.googleButton }
                                color="primary"
                                fullWidth
                                onClick={ renderProps.onClick }
                                disabled={ renderProps.disabled }
                                startIcon={ <Icon /> }
                                variant="contained">Google SignIn</Button>
                        ) }
                        onSuccess={ googleSuccess }
                        onFailure={ googleFailure }

                        cookiePolicy={ 'single_host_origin' }
                    /> */}
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={ switchMode }>{ isSignUp ? 'already have an account' : 'create new account' }</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;
