import React, { useState } from 'react';
import rice2 from '../../assets/images/rice2.jpg'
import { 
    Box,
    Button,
    Container,
    Grid,
    Snackbar,
    Alert as MUIAlert,
    AlertProps,
    AlertTitle,} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { useForm } from 'react-hook-form';
import { Input, PwInputSignIn } from '../sharedComponents/Input';
import { SignInGoogle } from './SignInGoogle';
import firebase from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,} from 'firebase/auth';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const myStyles = {
    body: {
        backgroundImage: `url(${rice2})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f6eddb',
        position: 'fixed',
        width: '100%',
        height: '100vh',
        fontSize: '100%'
    },
    nav: {
        marginTop: '15%',
        marginLeft: '43%',
        display: 'flex',
    },
    headerH6: {
        fontFamily: 'gelasio',
        fontSize: '1.25em',
        paddingBottom: '1vh',
        color: '#422913',
    },
    containerH6: {
        paddingTop:'3vh',
        fontFamily: 'gelasio',
        fontSize: '1.25em',
        lineHeight: '1.25em',
        color: '#422913',
        display: 'inline-flex'
    },
    container: {
        position: 'absolute',
        marginLeft: '43.25vw',
        marginTop: '6vh',
        width: '45vw'
    },
    submitButton: {
        backgroundColor: '#e7dbc6',
        color: '#66513e',
        fontFamily: 'gelasio',
        border: '1px solid #ede1ca',
        padding: '0.75vh 1.2vw',
        marginTop: '0.5vh',
        transition: '0.25s ease',
        "&:hover": {
            backgroundColor: '#ede1ca',
            border: '1px solid #b9a99c',
            transition: '0.3s ease'
        }
    }
}

const NavA = styled(Link) ({
    textDecoration: 'none',
    padding: '1vh 1.5vw 0 1.5vw',
    fontFamily: 'gelasio',
    fontSize: '1.35em',
    display: 'inline',
    color: '#66513e',
    letterSpacing: '2px',
    transition: '0.25s ease',
    "&:hover": {
        color: '#422913',
        transition: '0.3s ease',
        paddingTop: '0'
    },
})
const ConA = styled(Link) ({
    textDecoration: 'none',
    fontFamily: 'gelasio',
    fontSize: '1.25em',
    lineHeight: '1.25em',
    color: '#422913',
    display: 'inline-flex',
    transition: '0.25s ease',
    letterSpacing: '1px',
    "&:hover": {
        color: '#66513e',
        paddingLeft: '0.5vh',
        transition: '0.3s ease',
    }
})

interface userProps {
    email?: any,
    password?: any
}

const Alert = (props:AlertProps) => {
    return <MUIAlert elevation={6} variant='filled'/>
}

export const SignIn = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({});
    const auth = getAuth();

    const handleSnackOpen = () => {
        setOpen(true);
    };
    const handleSnackClose = () => {
        setOpen(false);
        navigate('/')
    };

    const onSubmit = async(data: any, event: any) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                localStorage.setItem('myAuth', 'true')
                onAuthStateChanged(auth,(user) => {
                    if (user) {
                        localStorage.setItem('token', user.uid)
                    }
                })
                const user = userCredential.user
                navigate('/')
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    // If user is already signed in, redirect to home page if they try to access the sign in page
    let isAuthenticated = localStorage.getItem('myAuth')
    if (isAuthenticated === 'true') {
        window.location.replace('/')
        return null
    } else {
        return (
            <Box sx={myStyles.body}>
            <Box sx ={myStyles.nav}>
                <NavA to='/'>HOME</NavA>
                <NavA to='/about'>ABOUT</NavA>
                <NavA to='/browse'>BROWSE</NavA>
                <NavA to='/signin'>SIGN IN</NavA>
                <NavA to='/signup'>SIGN UP</NavA>
            </Box>
            <Container sx={myStyles.container}>
                <h6 style={myStyles.headerH6}>SIGN IN HERE</h6>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input {...register('email')} name='email' label='Enter Email'/>
                    </div>
                    <div>
                        <PwInputSignIn {...register('password')} name='password' label='Enter Password'/>
                    </div>
                        <Button type='submit' sx={myStyles.submitButton}>Submit</Button>
                        <SignInGoogle open={open} onClick={handleSnackClose}/>
                </form>

                <h6 style={myStyles.containerH6}>Don't have an account? <KeyboardDoubleArrowRightIcon style={{fontSize:'1.1em', margin:'0 0.25vw'}}/></h6>
                <ConA to='/signup'>Register Now!</ConA>

                <Snackbar message="Success" open={open} autoHideDuration={3000}>
                    <Alert severity='success'> 
                        <AlertTitle>Successful Sign In. Redirecting to Home Page</AlertTitle>
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
        )
    }
}