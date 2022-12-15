import React from 'react';
import rice2 from '../../assets/images/rice2.jpg'
import { Box,} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { getAuth, signOut } from 'firebase/auth';


interface Props {
    title: String;
}

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

export const Home = (props: Props) => {
    const navigate = useNavigate();
    const auth = getAuth();
    localStorage.setItem('search', 'false')
    
    const signUsOut = async () => {
        await signOut(auth)
        localStorage.setItem('myAuth', 'false')
        localStorage.setItem('token', 'none')
        navigate('/')
    }
    
    let isAuthenticated = localStorage.getItem('myAuth')
    if (isAuthenticated === 'true') {
        return (
        <Box sx={myStyles.body}>
            <Box sx ={myStyles.nav}>
                <NavA to='/'>HOME</NavA>
                <NavA to='/about'>ABOUT</NavA>
                <NavA to='/browse'>BROWSE</NavA>
                <NavA to='/dashboard'>SAVED</NavA>
                <NavA to='/signin' onClick={signUsOut}>SIGN OUT</NavA>
            </Box>
            <h1 style={myStyles.headerH1_1}>GOOD FOOD,</h1>
            <h1 style={myStyles.headerH1_2}>GOOD MOOD.</h1>
        </Box>
        )
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
            <h1 style={myStyles.headerH1_1}>GOOD FOOD,</h1>
            <h1 style={myStyles.headerH1_2}>GOOD MOOD.</h1>
        </Box>
        )
    }

}