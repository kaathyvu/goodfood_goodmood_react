import React, { useState, useEffect } from 'react';
import { Drawer as MUIDrawer, AppBar, Box, Button, CssBaseline, Checkbox, Dialog, DialogTitle, 
    DialogContent, DialogActions, Divider, Grid, IconButton, Toolbar, Typography, TextField
} from '@mui/material';
import { getAuth, signOut, } from 'firebase/auth';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system'
import { theme } from '../../Theme/themes';
import ramen2 from '../../assets/images/ramen2.jpg'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { serverCalls } from '../../api';
import { UpdateRecipeForm } from '../AddRecipeForm';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';



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
        marginLeft: '1vw',
        width: '55vw',
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
    saveButton: {
        backgroundColor: '#e7dbc6',
        color: '#66513e',
        fontFamily: 'gelasio',
        border: '1px solid #ede1ca',
        padding: '0.75vh 1.2vw',
        margin: '0 0 2vh 0',
        transition: '0.25s ease',
        "&:hover": {
            backgroundColor: '#ede1ca',
            border: '1px solid #b9a99c',
            transition: '0.3s ease'
        }
    },
    deleteButton: {
        backgroundColor: '#e7dbc6',
        color: '#66513e',
        fontFamily: 'gelasio',
        border: '1px solid #ede1ca',
        padding: '0.75vh 1.2vw',
        margin: '0 0 2vh 1vw',
        transition: '0.25s ease',
        "&:hover": {
            backgroundColor: '#ede1ca',
            border: '1px solid #b9a99c',
            transition: '0.3s ease'
        }
    },
    titleText: {
        fontSize: '2em',
        color: '#422913',
        textAlign: 'center' as 'center',
    }, 
    resultBox: {
        backgroundColor: 'white',
        padding: '1vh',
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
    headerText: {
        color: '#422913',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '3vh'
    },
    descriptText: {
        color: '#422913',
        display: 'flex',
        marginTop: '2vh'
    },
    otherText: {
        color: '#422913',
        display: 'flex',
        marginBottom: '0.25vh'
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
    heart: {
        color: "#d32f2f"
    },
    textH6: {
        fontSize: '1em',
        color: '#422913',
        display: 'flex',
        padding: '1vh 0 0 0.25vh',
    }, 
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

const Text = styled('h1') ({
    textDecoration: 'none',
    fontFamily: 'gelasio',
    fontSize: '1em',
    lineHeight: '1em',
    color: '#422913',
    display: 'inline-flex',
    transition: '0.25s ease',
    letterSpacing: '1px',
    margin: '0 0 4vh 0.25vw',
    "&:hover": {
        color: '#66513e',
        paddingLeft: '0.5vh',
        transition: '0.3s ease',
    }
})

const RandomA = styled(Link) ({
    textDecoration: 'none',
    fontFamily: 'gelasio',
    fontSize: '1em',
    lineHeight: '1em',
    color: '#422913',
    display: 'inline-flex',
    transition: '0.25s ease',
    letterSpacing: '1px',
    margin: '0 0 4vh 0.25vw',
    "&:hover": {
        color: '#66513e',
        paddingLeft: '0.5vh',
        transition: '0.3s ease',
    }
})

export const SavedRecipe = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [open, setOpen] = useState(false);
    const [recipe, setRecipe] = useState<any>({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [checked, setChecked] = useState(false);

    const signUsOut = async () => {
        await signOut(auth)
        localStorage.setItem('myAuth', 'false')
        localStorage.setItem('token', 'none')
        navigate('/')
    }

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

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const deleteRecipe = async (id:string) => {
        const response = await serverCalls.delete(id)
        navigate('/dashboard')
    };

    const saveOrDelete = async (id:string) => {
        setChecked(!checked)
        if (checked === false) {
            const response = await serverCalls.delete(id)
            console.log(id, "deleted recipe")
        } else {
            let data = {
                "recipeid": `${localStorage.getItem('recipeid')}`,
                "title": `${localStorage.getItem('title')}`,
                "image_url": `${localStorage.getItem('image_url')}`,
                "servings": `${localStorage.getItem('servings')}`,
                "ready_in_min": `${localStorage.getItem('ready_in_min')}`,
                "source_url": `${localStorage.getItem('source_url')}`,
                "num_likes": `${localStorage.getItem('num_likes')}`,
                "cuisines": `${localStorage.getItem('cuisines')}`,
                "summary": `${localStorage.getItem('summary')}`,
                "token": `${localStorage.getItem('token')}`,
            }
            const response = await serverCalls.create(data)
            localStorage.setItem('id', response.id)
            console.log("resaved recipe", response.id)
        }
    }

    const recipeInfo = async () => {
        let id = localStorage.getItem('id')
        const response = await serverCalls.getOne(id)
        setRecipe(await response)
        console.log(response)
        localStorage.setItem('recipeid', response.recipeid)
        localStorage.setItem('title', response.title)
        localStorage.setItem('image_url', response.image_url)
        localStorage.setItem('servings', response.servings)
        localStorage.setItem('ready_in_min', response.ready_in_min)
        localStorage.setItem('source_url', response.source_url)
        localStorage.setItem('num_likes', response.num_likes)
        localStorage.setItem('cuisines', response.cuisines)
        localStorage.setItem('summary', response.summary)
    };

    useEffect(() => {
        recipeInfo()
    }, [])

    let isAuthenticated = localStorage.getItem('myAuth')
    if (isAuthenticated === 'true') {
        return (
        <Box sx={{overflowY:'auto', backgroundColor:'#f6eddb', backgroundImage: `url(${ramen2})`, backgroundPosition:'center right', backgroundRepeat:'no-repeat', height:'100vh', backgroundAttachment:'fixed'}}>
            <CssBaseline/>
            <AppBar sx={open ? myStyles.appBarShift : myStyles.appBar} position="fixed" elevation={0}>
                <Toolbar sx = {myStyles.toolbar}>
                    <Typography variant="h6" noWrap sx={myStyles.toolbarText} component="div">
                        GOOD FOOD GOOD MOOD
                    </Typography>
                    <IconButton aria-label='open-drawer' onClick={handleDrawerOpen} edge='end' sx={open ? myStyles.hide : myStyles.menuButton}>
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <MUIDrawer
                sx={open ? myStyles.drawer : myStyles.hide}
                variant='persistent'
                anchor='top'
                open={open}
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

            <Box sx={myStyles.content}>
            <br/><br/>
                <Grid container sx={myStyles.resultBox}>
                    <img src={recipe.image_url} alt="Recipe" style={{width:'100%',}}/>
                    <Grid item xs={12}><h1 style={myStyles.titleText}>{recipe.title}</h1></Grid>
                    <Grid item xs={4}>
                        <div style={{ display: "flex", alignItems: "center", marginTop: "1vh" }}>
                            <div style={{ flex: 1, backgroundColor: "#422913", height: "1px",}} />
                            <p style={{ margin: "0 1vw" }}>LIKES</p>
                            <div style={{ flex: 1, backgroundColor: "#422913", height: "1px" }} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ display: "flex", alignItems: "center", marginTop: "1vh" }}>
                            <div style={{ flex: 1, backgroundColor: "#422913", height: "1px"}} />
                            <p style={{ margin: "0 1vw" }}>SERVINGS</p>
                            <div style={{ flex: 1, backgroundColor: "#422913", height: "1px"}} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ display: "flex", alignItems: "center", marginTop: "1vh" }}>
                            <div style={{ flex: 1, backgroundColor: "#422913", height: "1px"}} />
                            <p style={{ margin: "0 1vw" }}>READY IN</p>
                            <div style={{ flex: 1, backgroundColor: "#422913", height: "1px"}} />
                        </div>
                    </Grid>
                    <Grid item xs={4} sx={myStyles.headerText}><p>{recipe.num_likes} <FavoriteIcon sx={{fontSize:'1em', color: '#d32f2f'}}/></p></Grid>
                    <Grid item xs={4} sx={myStyles.headerText}><p>{recipe.servings}</p></Grid>
                    <Grid item xs={4} sx={myStyles.headerText}><p>{recipe.ready_in_min} MIN</p></Grid>

                    <Grid item xs={12} sx={myStyles.descriptText}><p>{recipe.summary}</p></Grid>

                    <Grid item xs={12}>
                        <Text><a href={recipe.source_url} style={myStyles.aLink}>Check out the original source here for full ingredient list and instructions.</a></Text>
                    </Grid>

                    <Dialog open={dialogOpen} onSubmit={handleDialogClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='sm'>
                        <DialogTitle id='form-dialog-title'>Update Recipe</DialogTitle>
                        <DialogContent>
                            <UpdateRecipeForm/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClose} color="error">Cancel</Button>
                        </DialogActions>
                    </Dialog>

                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between' }}>
                        <Button sx={myStyles.saveButton} onClick={handleDialogOpen}>UPDATE RECIPE</Button>
                        <Checkbox 
                            icon={<Favorite/>} 
                            checkedIcon={<FavoriteBorder/>}
                            checked={checked}
                            onChange={() => saveOrDelete(recipe.id)}
                            sx={myStyles.heart}/>
                    </Grid>
                </Grid>
            </Box>
            </Box>
        )
    } else {
        window.location.replace('/signin')
        return null
    }
}