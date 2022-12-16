import React, { useState } from 'react';
import { Drawer as MUIDrawer, AppBar, Box, Button, Chip, CssBaseline, Dialog,
    DialogTitle, DialogContent, DialogActions, Divider, FormControl, Grid, IconButton,
    InputLabel, MenuItem, Select, SelectChangeEvent, Toolbar, Typography, useTheme,
} from '@mui/material';
import { getAuth, signOut, } from 'firebase/auth';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system'
import { theme } from '../../Theme/themes';
import ramen2 from '../../assets/images/ramen2.jpg'
import { useForm } from 'react-hook-form';
import { Input } from '../sharedComponents/Input';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';



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
    content: {
        backgroundColor: '#f6eddb',
        fontFamily: 'gelasio',
        padding: '10vh 2vw 0 2vw',
        width: '61.5vw',
    },
    cuisineForm: {
        paddingTop: '2vh'
    },
    dietForm: {
        display:'flex',
        paddingTop: '1vh',
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
    hide: {
        display: 'none',
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
    textH6: {
        fontSize: '0.9em',
        color: '#422913',
        textAlign: 'center' as 'center',
        display: 'flex',
        justifyContent: 'center',
        padding: '0.5vh 0.25vh',
        transition: '0.25s ease',
        "&:hover": {
            transition: '0.3s ease',
            color: '#422913',
            backgroundColor: '#e7dbc6'
        },
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
}

const diets = [
    'Gluten Free',
    'Ketogenic',
    'Vegetarian',
    'Vegan',
    'Pescetarian',
    'Paleo'
]

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

export const Browse = () => {
    const navigate = useNavigate();
    const[open, setOpen] = useState(false);
    const auth = getAuth();
    const theme = useTheme();
    const { register, handleSubmit } = useForm({});
    const [cuisine, setCuisine] = useState('');
    const [diet, setDiet] = useState<string[]>([]);
    const [readyInMinutes, setReadyInMinutes] = useState('');
    const [recipes, setRecipes] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false);
    const [resultText, setResultText] = useState(true);
    // const [offset, setOffset] = useState(6)

    const signUsOut = async () => {
        await signOut(auth)
        localStorage.setItem('myAuth', 'false')
        localStorage.setItem('token', 'none')
        navigate('/')
    }
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

    const handleCuisineChange = (event: SelectChangeEvent) => {
        setCuisine(event.target.value);
    };

    const handleReadyTime = (event: SelectChangeEvent) => {
        setReadyInMinutes(event.target.value);
    };
    
    const handleDietChange = (event: SelectChangeEvent<typeof diet>) => {
        const {
            target: { value },
        } = event;
        setDiet(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const onSubmit = async (data: any, event: any) => {
        let ingred = data.ingred
        let diet = data.diet
        if (diet) {
            diet = diet.join(',')
        }
        let cuisine = data.cuisine
        let readyInMinutes = data.readyInMinutes
        if (!readyInMinutes) {
            readyInMinutes = 1440
        }

        console.log(ingred, diet, cuisine, readyInMinutes)
        const response = await fetch(`
        https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOON1}&includeIngredients=${ingred}&diet=${diet}&cuisine=${cuisine}&maxReadyTime=${readyInMinutes}&number=6&offset=`)
        let recipeData = await response.json()
        setRecipes(await recipeData.results)
        console.log(recipeData.results)
        
        setResultText(false)
        event.target.reset()
    }

    const randomSubmit = async () => {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${SPOON1}&number=6`)
        const recipeData = await response.json()
        setRecipes(await recipeData.recipes)
        setResultText(false)
        handleDialogClose()
    }

    const recipeId = (recipeid:any) => {
        localStorage.setItem('recipeid', recipeid)
        navigate('/recipe')
    };

    const prevPage = async () => {
        // let offset = localStorage.getItem('offset')
        // if (offset > 0) {
        //     offset -= 6
        //     let prevURL = url + offset
        //     const response = await fetch(`${prevURL}`)
        //     localStorage.setItem('offset', offset)
        // }
        // let current
        // let url =
    };

    const nextPage = async () => {
        // const totalResults = parseInt(localStorage.getItem('totalResults'))
        // setOffset(offset + 6)
        // if (offset <= totalResults) {
        //     const response = await fetch(`
        //     https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOON1}&includeIngredients=${ingred}&diet=${diet}&cuisine=${cuisine}&maxReadyTime=${readyInMinutes}&number=6&offset=${offset}`)
        //     let recipeData = await response.json()
        //     setRecipes(await recipeData.results)
        // }
    };

    let isAuthenticated = localStorage.getItem('myAuth')
    if (isAuthenticated === 'true') {
        return (
        <Box sx={{backgroundColor:'#f6eddb', backgroundImage: `url(${ramen2})`, backgroundPosition:'center right', backgroundRepeat:'no-repeat', height:'100vh', backgroundAttachment:'fixed'}}>
            <CssBaseline/>
            <AppBar sx={open ? myStyles.appBarShift : myStyles.appBar} position="fixed" elevation={0}>
                <Toolbar sx = {myStyles.toolbar}>
                    <Typography variant="h6" noWrap sx={myStyles.toolbarText} component="div">
                        GOOD FOOD GOOD MOOD
                    </Typography>
                    <IconButton aria-label='search-bar' sx={myStyles.searchButton} onClick={handleDialogOpen}>
                        <p style={myStyles.searchText}>SEARCH</p>
                        <SearchIcon/>
                    </IconButton>
                    <IconButton aria-label='open-drawer' onClick={handleDrawerOpen} edge='end' sx={open ? myStyles.hide : myStyles.menuButton}>
                        <MenuIcon/>
                    </IconButton>

                    <Dialog open={dialogOpen} onSubmit={handleDialogClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='sm'>
                        <DialogTitle id='form-dialog-title'>Search a Recipe</DialogTitle>
                        <DialogContent>
                        <Grid>
                <br/>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Grid item>
                    <Input {...register('ingred')} name='ingred' label='Enter Ingredients' helperText="Separate multiple ingredients with a comma"/>
                </Grid>
                <Grid item sx={myStyles.dietForm}>
                    <FormControl fullWidth>
                        <InputLabel>Diet Restrictions</InputLabel>
                        <Select 
                            {...register('diet')}
                            style={{color: '#66513e'}}
                            label='Diet Restrictions'
                            multiple
                            value={diet}
                            onChange={handleDietChange}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, fontFamily: 'gelasio' }}>
                                {selected.map((value) => (
                                    <Chip style={{backgroundColor:'#ede1ca'}} key={value} label={value} />
                                ))}
                                </Box>
                            )}>
                            {diets.map((diet) => (
                                <MenuItem key={diet} value={diet}>{diet}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sx={myStyles.cuisineForm}>
                <FormControl fullWidth>
                        <InputLabel>Cuisine Type</InputLabel>
                        <Select 
                        {...register('cuisine')}
                        style={{color: '#66513e'}}
                        label='Cuisine Type'
                        onChange={handleCuisineChange} 
                        MenuProps={{ PaperProps: { sx: {maxHeight: 200 }}}}
                        defaultValue=''
                        >
                            <MenuItem value=''>None</MenuItem>
                            <MenuItem value='african'>African</MenuItem>
                            <MenuItem value='american'>American</MenuItem>
                            <MenuItem value='british'>British</MenuItem>
                            <MenuItem value='cajun'>Cajun</MenuItem>
                            <MenuItem value='caribbean'>Caribbean</MenuItem>
                            <MenuItem value='chinese'>Chinese</MenuItem>
                            <MenuItem value='eastern european'>Eastern European</MenuItem>
                            <MenuItem value='european'>European</MenuItem>
                            <MenuItem value='french'>French</MenuItem>
                            <MenuItem value='german'>German</MenuItem>
                            <MenuItem value='greek'>Greek</MenuItem>
                            <MenuItem value='indian'>Indian</MenuItem>
                            <MenuItem value='irish'>Irish</MenuItem>
                            <MenuItem value='italian'>Italian</MenuItem>
                            <MenuItem value='japanese'>Japanese</MenuItem>
                            <MenuItem value='jewish'>Jewish</MenuItem>
                            <MenuItem value='korean'>Korean</MenuItem>
                            <MenuItem value='latin american'>Latin American</MenuItem>
                            <MenuItem value='mediterranean'>Mediterranean</MenuItem>
                            <MenuItem value='mexican'>Mexican</MenuItem>
                            <MenuItem value='middle eastern'>Middle Eastern</MenuItem>
                            <MenuItem value='nordic'>Nordic</MenuItem>
                            <MenuItem value='southern'>Southern</MenuItem>
                            <MenuItem value='spanish'>Spanish</MenuItem>
                            <MenuItem value='thai'>Thai</MenuItem>
                            <MenuItem value='vietnamese'>Vietnamese</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sx={myStyles.cuisineForm}>
                <FormControl fullWidth>
                        <InputLabel>Total Prep & Cook Time</InputLabel>
                        <Select 
                        {...register('readyInMinutes')}
                        style={{color: '#66513e'}}
                        label='Total Prep & Cook Time'
                        onChange={handleReadyTime} 
                        defaultValue=''
                        MenuProps={{ PaperProps: { sx: {maxHeight: 200 }}}}
                        >
                            <MenuItem value=''>None</MenuItem>
                            <MenuItem value='30'>Less than 30 minutes</MenuItem>
                            <MenuItem value='60'>30-60 minutes</MenuItem>
                            <MenuItem value='720'>1 hour+</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                    <Button type='submit' sx={myStyles.submitButton}>Submit</Button>
                    <Button sx={myStyles.randomButton} onClick={randomSubmit}>Generate a Random Recipe</Button>
                </form>
                </Grid>
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

            <Box sx={resultText ? myStyles.hide : myStyles.pages}>
                <IconButton aria-label='prev-page' sx={myStyles.pageButton} onClick={prevPage}>
                    <KeyboardDoubleArrowLeftIcon sx={{fontSize:'2em'}}/>
                </IconButton>
                <IconButton aria-label='next-page' sx={myStyles.pageButton} onClick={nextPage}>
                    <KeyboardDoubleArrowRightIcon sx={{fontSize:'2em'}}/>
                </IconButton>
            </Box>
            

            <Box sx={myStyles.content}>
                <br/><br/>
                <Box sx={resultText ? {fontSize:'1em'} : myStyles.hide}>Start searching some recipes to display the results here!</Box>
                <Grid container sx={myStyles.resultRow1}>
                {recipes.map((item:any) => (
                    <Grid item xs={3.5} sx={myStyles.resultBox}>
                        <ul>
                        <img id='result-img' src={item.image} alt="Recipe" onClick={() => recipeId(item.id)}/>
                        <center><Button sx={myStyles.textH6} onClick={() => recipeId(item.id)}>{item.title}</Button></center>
                        </ul>
                    </Grid>
                ))}</Grid>
            </Box>
            </Box>
        )
    } else {
        return (
        <Box sx={{backgroundColor:'#f6eddb', backgroundImage: `url(${ramen2})`, backgroundPosition:'center right', backgroundRepeat:'no-repeat', height:'100vh', backgroundAttachment:'fixed'}}>
            <CssBaseline/>
            <AppBar sx={open ? myStyles.appBarShift : myStyles.appBar} position="fixed" elevation={0}>
                <Toolbar sx = {myStyles.toolbar}>
                    <Typography variant="h6" noWrap sx={myStyles.toolbarText} component="div">
                        GOOD FOOD GOOD MOOD
                    </Typography>
                    <IconButton aria-label='search-bar' sx={myStyles.searchButton} onClick={handleDialogOpen}>
                        <p style={myStyles.searchText}>SEARCH</p>
                        <SearchIcon/>
                    </IconButton>
                    <IconButton aria-label='open-drawer' onClick={handleDrawerOpen} edge='end' sx={open ? myStyles.hide : myStyles.menuButton}>
                        <MenuIcon/>
                    </IconButton>

                    <Dialog open={dialogOpen} onSubmit={handleDialogClose} aria-labelledby='form-dialog-title' fullWidth maxWidth='sm'>
                        <DialogTitle id='form-dialog-title'>Search a Recipe</DialogTitle>
                        <DialogContent>
                        <Grid>
                <br/>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Grid item>
                    <Input {...register('ingred')} name='ingred' label='Enter Ingredients' helperText="Separate multiple ingredients with a comma"/>
                </Grid>
                <Grid item sx={myStyles.dietForm}>
                    <FormControl fullWidth>
                        <InputLabel>Diet Restrictions</InputLabel>
                        <Select 
                            {...register('diet')}
                            style={{color: '#66513e'}}
                            label='Diet Restrictions'
                            multiple
                            value={diet}
                            onChange={handleDietChange}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, fontFamily: 'gelasio' }}>
                                {selected.map((value) => (
                                    <Chip style={{backgroundColor:'#ede1ca'}} key={value} label={value} />
                                ))}
                                </Box>
                            )}>
                            {diets.map((diet) => (
                                <MenuItem key={diet} value={diet}>{diet}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sx={myStyles.cuisineForm}>
                <FormControl fullWidth>
                        <InputLabel>Cuisine Type</InputLabel>
                        <Select 
                        {...register('cuisine')}
                        style={{color: '#66513e'}}
                        label='Cuisine Type'
                        onChange={handleCuisineChange} 
                        MenuProps={{ PaperProps: { sx: {maxHeight: 200 }}}}
                        defaultValue=''
                        >
                            <MenuItem value=''>None</MenuItem>
                            <MenuItem value='african'>African</MenuItem>
                            <MenuItem value='american'>American</MenuItem>
                            <MenuItem value='british'>British</MenuItem>
                            <MenuItem value='cajun'>Cajun</MenuItem>
                            <MenuItem value='caribbean'>Caribbean</MenuItem>
                            <MenuItem value='chinese'>Chinese</MenuItem>
                            <MenuItem value='eastern european'>Eastern European</MenuItem>
                            <MenuItem value='european'>European</MenuItem>
                            <MenuItem value='french'>French</MenuItem>
                            <MenuItem value='german'>German</MenuItem>
                            <MenuItem value='greek'>Greek</MenuItem>
                            <MenuItem value='indian'>Indian</MenuItem>
                            <MenuItem value='irish'>Irish</MenuItem>
                            <MenuItem value='italian'>Italian</MenuItem>
                            <MenuItem value='japanese'>Japanese</MenuItem>
                            <MenuItem value='jewish'>Jewish</MenuItem>
                            <MenuItem value='korean'>Korean</MenuItem>
                            <MenuItem value='latin american'>Latin American</MenuItem>
                            <MenuItem value='mediterranean'>Mediterranean</MenuItem>
                            <MenuItem value='mexican'>Mexican</MenuItem>
                            <MenuItem value='middle eastern'>Middle Eastern</MenuItem>
                            <MenuItem value='nordic'>Nordic</MenuItem>
                            <MenuItem value='southern'>Southern</MenuItem>
                            <MenuItem value='spanish'>Spanish</MenuItem>
                            <MenuItem value='thai'>Thai</MenuItem>
                            <MenuItem value='vietnamese'>Vietnamese</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sx={myStyles.cuisineForm}>
                <FormControl fullWidth>
                        <InputLabel>Total Prep & Cook Time</InputLabel>
                        <Select 
                        {...register('readyInMinutes')}
                        style={{color: '#66513e'}}
                        label='Total Prep & Cook Time'
                        onChange={handleReadyTime} 
                        defaultValue=''
                        MenuProps={{ PaperProps: { sx: {maxHeight: 200 }}}}
                        >
                            <MenuItem value=''>None</MenuItem>
                            <MenuItem value='30'>Less than 30 minutes</MenuItem>
                            <MenuItem value='60'>30-60 minutes</MenuItem>
                            <MenuItem value='720'>1 hour+</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                    <Button type='submit' sx={myStyles.submitButton}>Submit</Button>
                    <Button sx={myStyles.randomButton} onClick={randomSubmit}>Generate a Random Recipe</Button>
                </form>
                </Grid>
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
                <NavA to='/signin'>SIGN IN</NavA>
                <NavA to='/signup'>SIGN UP</NavA>

            </MUIDrawer>

            <Box sx={resultText ? myStyles.hide : myStyles.pages}>
                <IconButton aria-label='prev-page' sx={myStyles.pageButton} onClick={prevPage}>
                    <KeyboardDoubleArrowLeftIcon sx={{fontSize:'2em'}}/>
                </IconButton>
                <IconButton aria-label='next-page' sx={myStyles.pageButton} onClick={nextPage}>
                    <KeyboardDoubleArrowRightIcon sx={{fontSize:'2em'}}/>
                </IconButton>
            </Box>
            

            <Box sx={myStyles.content}>
                <br/><br/>
                <Box sx={resultText ? {fontSize:'1em'} : myStyles.hide}>Start searching some recipes to display the results here!</Box>
                <Grid container sx={myStyles.resultRow1}>
                {recipes.map((item:any) => (
                    <Grid item xs={3.5} sx={myStyles.resultBox}>
                        <ul>
                        <img id='result-img' src={item.image} alt="Recipe" onClick={() => recipeId(item.id)}/>
                        <center><Button sx={myStyles.textH6} onClick={() => recipeId(item.id)}>{item.title}</Button></center>
                        </ul>
                    </Grid>
                ))}</Grid>
            </Box>
            </Box>
        )
    }
}