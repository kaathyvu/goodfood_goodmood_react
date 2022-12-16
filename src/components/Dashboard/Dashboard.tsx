import React, { useState } from 'react';
import { Drawer as MUIDrawer, AppBar, Box, Button, CssBaseline, Dialog, DialogTitle, 
    DialogContent, DialogActions, Divider, Grid, IconButton, Toolbar, Typography,
} from '@mui/material';
import { getAuth, signOut, } from 'firebase/auth';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system'
import { theme } from '../../Theme/themes';
import ramen2 from '../../assets/images/ramen2.jpg'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { AddRecipeForm } from '../AddRecipeForm/AddRecipeForm';
import { DataTable } from '../DataTable/DataTable'

const myStyles = {
    appBar: {
        paddingTop: '5vh',
        backgroundColor:'#f6eddb',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    appBarShift: {
        height: 0,
        paddingTop: '5vh',
        backgroundColor:'#f6eddb',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    menuButton: {
        marginRight: '1vw',
        color: '#422913',
        transition: '0.25s ease',
        "&:hover": {
            transition: '0.3s ease',
            color: '#422913',
            backgroundColor: '#ede1ca'
        },
    },
    searchButton: {
        borderRadius: '20px',
        color: '#422913',
        transition: '0.25s ease',
        marginRight:'0.5vw',
        "&:hover": {
            transition: '0.3s ease',
            color: '#422913',
            backgroundColor: '#ede1ca'
        },
    },
    searchText: {
        fontFamily: 'gelasio',
        fontSize:'0.6em', 
        letterSpacing: '2px', 
        padding:'0 0.25vw', 
        color:'#422913', 
        '&:hover': {
            color:'white'
        }
    },
    closeButton: {
        marginRight: '0.25vw',
        color: '#422913',
        transition: '0.25s ease',
        "&:hover": {
            transition: '0.3s ease',
            color: '#422913',
            backgroundColor: '#ede1ca'
        },
    },
    hide: {
        display: 'none',
    },
    drawer: {
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            height: '100vh',
            backgroundColor: '#f6eddb',
            
        }
    },
    drawerHeader: {
        marginTop: '5vh',
        height: '28px',
        backgroundColor: '#f6eddb',
        display: 'flex',
        alignItems: 'center',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        marginRight: '2vw',
    },
    content: {
        backgroundColor: '#f6eddb',
        fontFamily: 'gelasio',
        padding: '10vh 2vw 0 2vw',
        width: '61.5vw',
    },
    toolbar: {
        backgroundColor:'#f6eddb',
    },
    toolbarText: {
        fontFamily: 'gelasio',
        fontSize: '2em',
        color: '#422913',
        flexGrow: 1,
        fontWeight: 600,
    },
    submitButton: {
        backgroundColor: '#e7dbc6',
        color: '#66513e',
        fontFamily: 'gelasio',
        border: '1px solid #ede1ca',
        padding: '0.75vh 1.2vw',
        marginTop: '1.25vh',
        transition: '0.25s ease',
        "&:hover": {
            backgroundColor: '#ede1ca',
            border: '1px solid #b9a99c',
            transition: '0.3s ease'
        }
    },
    randomButton: {
        backgroundColor: '#e7dbc6',
        color: '#66513e',
        fontFamily: 'gelasio',
        border: '1px solid #ede1ca',
        padding: '0.75vh 1.2vw',
        marginTop: '1.25vh',
        marginLeft: '1vw',
        transition: '0.25s ease',
        "&:hover": {
            backgroundColor: '#ede1ca',
            border: '1px solid #b9a99c',
            transition: '0.3s ease'
        }
    },
    dietForm: {
        display:'flex',
        paddingTop: '1vh',
    },
    cuisineForm: {
        paddingTop: '2vh'
    },
    textH6: {
        fontSize: '1em',
        color: '#422913',
        display: 'flex',
        padding: '1vh 0 0 0.25vh',
    }, 
    resultRow1: {
        width: '100%',
        display: 'flex',
        justifyContent:'center',
    },
    resultBox: {
        backgroundColor: 'white',
        padding: '0.5vh',
        margin: '-1vh 1.5vw 3vh 0',
        listStyle: 'none',
    },
    pageButton: {
        color: '#422913',
        transition: '0.25s ease',
        "&:hover": {
            transition: '0.3s ease',
            color: '#422913',
            backgroundColor: '#ede1ca'
        },
    },
    pages: {
        position: 'absolute',
        marginLeft: '58vw',
        marginTop: '48vh'
    }
}

const NavA = styled(Link) ({
    textDecoration: 'none',
    fontFamily: 'gelasio',
    fontSize: '48px',
    color: '#66513e',
    textAlign: 'center',
    letterSpacing: '2px',
    lineHeight: '54px',
    margin: '4.5vh auto 0 auto',
    transition: '0.25s ease',
    "&:hover": {
        color: '#422913',
        fontSize: '52px',
        transition: '0.3s ease',
        letterSpacing: '4px',
    },
})

const RandomA = styled(Link) ({
    textDecoration: 'none',
    fontFamily: 'gelasio',
    fontSize: '1em',
    lineHeight: '1em',
    color: '#422913',
    display: 'flex',
    transition: '0.25s ease',
    letterSpacing: '1px',
    marginLeft: '0.2vw',
    padding: '0.44vh',
    "&:hover": {
        color: '#66513e',
        paddingTop: '0vh',
        transition: '0.3s ease',
    }
})

export const Dashboard = () => {
    const navigate = useNavigate();
    const[open, setOpen] = useState(false);
    const auth = getAuth();
    const [dialogOpen, setDialogOpen] = useState(false);

    const signUsOut = async () => {
        await signOut(auth)
        localStorage.setItem('myAuth', 'false')
        localStorage.setItem('token', 'none')
        navigate('/')
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
        // Prevents scrolling of main content when drawer is open
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }
    };

    const handleDrawerClose = () => {
        setOpen(false);
        document.body.style.overflow = 'unset';
    };

    let isAuthenticated = localStorage.getItem('myAuth')
    if (isAuthenticated === 'true') {
        return (
        <Box sx={{overflowY: 'auto', backgroundColor:'#f6eddb', backgroundImage: `url(${ramen2})`, backgroundPosition:'center right', backgroundRepeat:'no-repeat', height:'100vh', backgroundAttachment:'fixed'}}>
            <CssBaseline/>
            <AppBar sx={open ? myStyles.appBarShift : myStyles.appBar} position="fixed" elevation={0}>
                <Toolbar sx = {myStyles.toolbar}>
                    <Typography variant="h6" noWrap sx={myStyles.toolbarText} component="div">
                        GOOD FOOD GOOD MOOD
                    </Typography>
                    <IconButton aria-label='add-recipe' sx={myStyles.searchButton} onClick={handleDialogOpen}>
                        <LocalDiningIcon/>
                        <p style={myStyles.searchText}>ADD A RECIPE</p>
                    </IconButton>
                    <IconButton aria-label='open-drawer' onClick={handleDrawerOpen} edge='end' sx={open ? myStyles.hide : myStyles.menuButton}>
                        <MenuIcon/>
                    </IconButton>

                    <Dialog open={dialogOpen} onSubmit={handleDialogClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='sm'>
                        <DialogTitle id='form-dialog-title'>Create Your Own Recipe!</DialogTitle>
                        <DialogContent>
                            <AddRecipeForm/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClose} color="error">Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </Toolbar>
            </AppBar>

            <MUIDrawer
                sx={open ? myStyles.drawer : myStyles.hide}
                variant='persistent'
                anchor='top'
                open={open}
                transitionDuration={{ enter: 650 }}
            >
                <Box sx={myStyles.drawerHeader}>
                    <IconButton onClick={handleDrawerClose} style={myStyles.closeButton}>
                        <CloseIcon/>
                    </IconButton>
                </Box>

                <Divider/>

                <NavA to='/'>HOME</NavA>
                <NavA to='/about'>ABOUT</NavA>
                <NavA to='/browse'>BROWSE</NavA>
                <NavA to='/dashboard'>SAVED</NavA>
                <NavA to='/signin' onClick={signUsOut}>SIGN OUT</NavA>

            </MUIDrawer>

            {/* <Box sx={myStyles.pages}>
                <IconButton aria-label='prev-page' sx={myStyles.pageButton}>
                    <KeyboardDoubleArrowLeftIcon sx={{fontSize:'2em'}}/>
                </IconButton>
                <IconButton aria-label='next-page' sx={myStyles.pageButton}>
                    <KeyboardDoubleArrowRightIcon sx={{fontSize:'2em'}}/>
                </IconButton>
            </Box> */}
            

            <Box sx={myStyles.content}>
                <br/><br/>
                    <DataTable/>
            </Box>
            </Box>
        )
    } else {
        window.location.replace('/signin')
        return null
    }
}