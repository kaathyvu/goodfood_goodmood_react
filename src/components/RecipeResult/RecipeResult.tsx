import React, { useState, useEffect } from 'react';
import { Drawer as MUIDrawer, AppBar, Box, Button, CssBaseline, Checkbox, Divider, Grid, IconButton, Toolbar, Typography, } from '@mui/material';
import { getAuth, signOut, } from 'firebase/auth';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system'
import { theme } from '../../Theme/themes';
import ramen2 from '../../assets/images/ramen2.jpg'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { chooseRecipeId, chooseTitle, chooseImageURL, chooseServings, chooseReadyTime, chooseSourceURL, 
    chooseNumLikes, chooseCuisines, chooseSummary, chooseToken } from '../../redux/slices/rootSlice'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { serverCalls } from '../../api';
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
    backButton: {
        backgroundColor: '#e7dbc6',
        color: '#66513e',
        fontFamily: 'gelasio',
        border: '1px solid #ede1ca',
        padding: '0.75vh 1.2vw',
        margin: '0vh 0 2vh 1vw',
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
    margin: '3vh 0 4vh 0.25vw',
    "&:hover": {
        color: '#66513e',
        paddingLeft: '0.5vh',
        transition: '0.3s ease',
    }
})

export const Recipe = () => {
    const navigate = useNavigate();
    const store = useStore();
    const auth = getAuth();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [recipe, setRecipe] = useState<any>({});
    const [ingredients, setIngredients] = useState<any>([]);
    const [instructions, setInstructions] = useState<any>([]);
    const [checked, setChecked] = useState(true);

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



    const saveOrDelete = async() => {
        let token = localStorage.getItem('token')

        if (token === null || token === 'none') {
            navigate('/signin')
        }
        console.log(checked)
        setChecked(!checked)
        console.log(checked)

        if (checked === false) {
            let id:any = localStorage.getItem('id')
            const response = await serverCalls.delete(id)
            console.log(id, "deleted recipe")
        } else if (recipe.cuisines[0] === undefined) {
            dispatch(chooseRecipeId(localStorage.getItem('recipeid')))
            dispatch(chooseTitle(recipe.title))
            dispatch(chooseImageURL(`https://spoonacular.com/recipeImages/${recipe.id}-636x393.${recipe.imageType}`))
            dispatch(chooseServings(recipe.servings))
            dispatch(chooseReadyTime(recipe.readyInMinutes))
            dispatch(chooseSourceURL(recipe.sourceUrl))
            dispatch(chooseNumLikes(recipe.aggregateLikes))
            dispatch(chooseSummary(recipe.summary))
            dispatch(chooseToken(localStorage.getItem('token')))
            const response = await serverCalls.create(store.getState())
            localStorage.setItem('id', response.id)
            console.log("saved recipe", response.id)
        } else {
            dispatch(chooseRecipeId(localStorage.getItem('recipeid')))
            dispatch(chooseTitle(recipe.title))
            dispatch(chooseImageURL(`https://spoonacular.com/recipeImages/${recipe.id}-636x393.${recipe.imageType}`))
            dispatch(chooseServings(recipe.servings))
            dispatch(chooseReadyTime(recipe.readyInMinutes))
            dispatch(chooseSourceURL(recipe.sourceUrl))
            dispatch(chooseNumLikes(recipe.aggregateLikes))
            dispatch(chooseCuisines(recipe.cuisines[0]))
            dispatch(chooseSummary(recipe.summary))
            dispatch(chooseToken(localStorage.getItem('token')))
            const response = await serverCalls.create(store.getState())
            localStorage.setItem('id', response.id)
            console.log("saved recipe", response.id)
        }
    };

    const recipeInfo = async () => {
        let recipeId = localStorage.getItem('recipeid')
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOON1}`)
        const data = await response.json()
        setRecipe(await data)
        console.log(data)
        setIngredients(data.extendedIngredients)
        setInstructions(data.analyzedInstructions[0].steps)
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
                    <img src={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.${recipe.imageType}`} alt="Recipe" style={{width:'100%',}}/>
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
                    <Grid item xs={4} sx={myStyles.headerText}><p>{recipe.aggregateLikes} <FavoriteIcon sx={{fontSize:'1em', color: '#d32f2f'}}/></p></Grid>
                    <Grid item xs={4} sx={myStyles.headerText}><p>{recipe.servings}</p></Grid>
                    <Grid item xs={4} sx={myStyles.headerText}><p>{recipe.readyInMinutes} MIN</p></Grid>

                    <Grid item xs={12} sx={myStyles.descriptText}><p>{recipe.summary}</p></Grid>

                    <Grid item xs={12} sx={myStyles.descriptText}><p><b>INGREDIENTS:</b></p></Grid>
                    <Grid item xs={12} sx={myStyles.otherText}><ul>
                    {ingredients.map((item:any) => (
                        <li style={{margin: '0 3vw'}}>{item.amount} {item.unit} {item.name}</li>
                    ))}</ul></Grid>

                    <Grid item xs={12} sx={myStyles.descriptText}><p><b>INSTRUCTIONS:</b></p></Grid>
                    <Grid item xs={12} sx={myStyles.otherText}><ol>
                    {instructions.map((item:any) => (
                        <li style={{margin: '0 3vw'}}>{item.step}</li>
                    ))}</ol></Grid>
                    <Grid item xs={12}>
                        <Text><a href={recipe.source_url} style={myStyles.aLink}>Check out the original source here.</a></Text>
                    </Grid>

                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between' }}>
                        <Button sx={myStyles.backButton} onClick={() => navigate(-1)}>BACK TO RESULTS</Button>
                        <Checkbox 
                            icon={<Favorite/>} 
                            checkedIcon={<FavoriteBorder/>}
                            checked={checked}
                            onChange={saveOrDelete}
                            sx={myStyles.heart}/>
                    </Grid>
                </Grid>
            </Box>
            </Box>
        )
    } else {
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
                <NavA to='/signin'>SIGN IN</NavA>
                <NavA to='/sign up'>SIGN UP</NavA>

            </MUIDrawer>

            <Box sx={myStyles.content}>
            <br/><br/>
                <Grid container sx={myStyles.resultBox}>
                    <img src={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.${recipe.imageType}`} alt="Recipe" style={{width:'100%',}}/>
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
                    <Grid item xs={4} sx={myStyles.headerText}><p>{recipe.aggregateLikes} <FavoriteIcon sx={{fontSize:'1em', color: '#d32f2f'}}/></p></Grid>
                    <Grid item xs={4} sx={myStyles.headerText}><p>{recipe.servings}</p></Grid>
                    <Grid item xs={4} sx={myStyles.headerText}><p>{recipe.readyInMinutes} MIN</p></Grid>

                    <Grid item xs={12} sx={myStyles.descriptText}><p>{recipe.summary}</p></Grid>

                    <Grid item xs={12} sx={myStyles.descriptText}><p><b>INGREDIENTS:</b></p></Grid>
                    <Grid item xs={12} sx={myStyles.otherText}><ul>
                    {ingredients.map((item:any) => (
                        <li style={{margin: '0 3vw'}}>{item.amount} {item.unit} {item.name}</li>
                    ))}</ul></Grid>

                    <Grid item xs={12} sx={myStyles.descriptText}><p><b>INSTRUCTIONS:</b></p></Grid>
                    <Grid item xs={12} sx={myStyles.otherText}><ol>
                    {instructions.map((item:any) => (
                        <li style={{margin: '0 3vw'}}>{item.step}</li>
                    ))}</ol></Grid>
                    <Grid item xs={12}>
                        <Text><a href={recipe.source_url} style={myStyles.aLink}>Check out the original source here.</a></Text>
                    </Grid>

                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between' }}>
                        <Button sx={myStyles.backButton} onClick={() => navigate(-1)}>BACK TO RESULTS</Button>
                        <Checkbox 
                            icon={<Favorite/>} 
                            checkedIcon={<FavoriteBorder/>}
                            checked={checked}
                            onChange={saveOrDelete}
                            sx={myStyles.heart}/>
                    </Grid>
                </Grid>
            </Box>
            </Box>
        )
    }
}