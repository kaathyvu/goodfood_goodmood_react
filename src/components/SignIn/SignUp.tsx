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
import { Input, PwInputSignUp } from '../sharedComponents/Input';
import firebase from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,} from 'firebase/auth';

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

export const SignUp = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({})
    const auth = getAuth();

    const handleSnackOpen = () => {
        setOpen(true)
    }
    const handleSnackClose= () => {
        setOpen(false)
    }

    const onSubmit = async (data: any, event: any) => {
        console.log(auth)

        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user
                navigate('/signin')
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
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
            <h6 style={myStyles.headerH6}>SIGN UP HERE</h6>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input {...register('email')} name='email' label='Enter Email'/>
                </div>
                <div>
                    <PwInputSignUp {...register('password')} name='password' label='Enter Password'/>
                </div>
                <Button type='submit' sx={myStyles.submitButton}>Create Account</Button>
            </form>
        </Container>
    </Box>
    )
}