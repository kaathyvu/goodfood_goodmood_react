import React from 'react';
import rice2 from '../../assets/images/rice2.jpg'
import { Box, Container } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { getAuth, signOut } from 'firebase/auth';


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
    container: {
        position: 'absolute',
        marginLeft: '43.25vw',
        marginTop: '6vh',
        width: '45vw'
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
        fontSize: '1em',
        lineHeight: '1,25em',
        color: '#66513e',
    },
    aLink: {
        textDecoration: 'none',
        fontFamily: 'gelasio',
        fontSize: '1em',
        lineHeight: '1em',
        color: '#422913',
        display: 'inline-flex',
        transition: '0.25s ease',
        letterSpacing: '1px',
        paddingTop: '3vh',
    },
}


const Text = styled('h1') ({
textDecoration: 'none',
fontFamily: 'gelasio',
fontSize: '1em',
lineHeight: '1.25em',
color: '#422913',
transition: '0.25s ease',
letterSpacing: '1px',
display: 'inline-flex',
"&:hover": {
    color: '#66513e',
    paddingLeft: '0.5vh',
    transition: '0.3s ease',
}
})

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

export const About = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    
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
            <Container sx={myStyles.container}>
                <h6 style={myStyles.headerH6}>This full stack web application was created by Kathy Vu. It was built with React on the front-end and
                Flask on the back-end with a PostgreSQL database. It was based on a first-world dilemma that I 
                encounter frequently, which is "what the heck do I wanna eat for dinner?" I was sick and tired of eating the same things constantly, 
                so I thought about how I could solve this issue. Therefore, Good Food Good Mood came to life. This application gives users the ability to
                search through thousands of recipes all in one place. I incorporated a dashboard where users can save recipes they enjoyed, or add recipes 
                of their own to create their own online digital cookbook. I was determined on building something that gave me the freedom to choose a recipe
                based on my own search criteria, whether it be based on the ingredients leftover in my fridge, or random recipes to inspire me when I'm 
                feeling ambitious to try something new.<br/>

                Source: <Text><a href='https://spoonacular.com/food-api' style={myStyles.aLink}>Spoonacular API</a></Text></h6>
            </Container>
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
            <Container sx={myStyles.container}>
                <h6 style={myStyles.headerH6}>This full stack web application was created by Kathy Vu. It was built with React on the front-end and
                Flask on the back-end with a PostgreSQL database. It was based on a first-world dilemma that I 
                encounter frequently, which is "what the heck do I wanna eat for dinner?" I was sick and tired of eating the same things constantly, 
                so I thought about how I could solve this issue. Therefore, Good Food Good Mood came to life. This application gives users the ability to
                search through thousands of recipes all in one place. I incorporated a dashboard where users can save recipes they enjoyed, or add recipes 
                of their own to create their own online digital cookbook. I was determined on building something that gave me the freedom to choose a recipe
                based on my own search criteria, whether it be based on the ingredients leftover in my fridge, or random recipes to inspire me when I'm 
                feeling ambitious to try something new.<br/>

                Source: <Text><a href='https://spoonacular.com/food-api' style={myStyles.aLink}>Spoonacular API</a></Text></h6>
            </Container>
        </Box>
        )
    }
}