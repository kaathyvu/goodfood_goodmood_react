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
    AlertTitle,
    CircularProgress,} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import firebase from 'firebase/app';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,} from 'firebase/auth';


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
    headerH1_1: {
        fontFamily: 'gelasio',
        fontSize: '6em',
        lineHeight: '1em',
        marginLeft:'44.5%',
        marginTop: '3.5%',
        color: '#422913',
    },
    headerH1_2: {
        fontFamily: 'gelasio',
        fontSize: '6em',
        lineHeight: '0.79em',
        marginLeft:'44.5%',
        color: '#422913',
    },
    headerH6: {
        fontFamily: 'gelasio',
        fontSize: '1.25em',
        lineHeight: '0.79em',
        marginLeft:'44.5%',
        marginTop: '3.5%',
        color: '#422913',
    },
    submitButton: {
        backgroundColor: '#e7dbc6',
        color: '#66513e',
        fontFamily: 'gelasio',
        border: '1px solid #ede1ca',
        padding: '0.75vh 1.2vw',
        marginTop: '0.5vh',
        marginLeft: '0.65vw',
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
    fontSize: '1.5em',
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

interface buttonProps {
    open?: boolean,
    onClick?: () => void
}

const Alert = (props:AlertProps) => {
    return <MUIAlert elevation={6} variant='filled'/>
}


export const SignInGoogle = (props:buttonProps) => {
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    onAuthStateChanged(auth,(user) => {
        if (user) {

            localStorage.setItem('token', user.uid)
        }
    })

    const signIn = async () => {
        await signInWithGoogle()
        localStorage.setItem('myAuth', 'true')
        onAuthStateChanged(auth,(user) => {
            if (user) {
                localStorage.setItem('token', user.uid)
            }
        })
        navigate('/')
    }

    const signUsOut = async () => {
        await signOut(auth)
        localStorage.setItem('myAuth', 'false')
        localStorage.setItem('token', 'none')
    }

    if (loading) {
        return <CircularProgress/>
    }
    return (
        <Button onClick={signIn} sx={myStyles.submitButton}>Sign In With Google</Button>
    )
}