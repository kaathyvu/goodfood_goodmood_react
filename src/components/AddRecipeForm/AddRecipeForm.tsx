import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseRecipeId, chooseTitle, chooseImageURL, chooseServings, chooseReadyTime, chooseSourceURL, 
    chooseNumLikes, chooseCuisines, chooseSummary, chooseToken } from '../../redux/slices/rootSlice'
import { Input, InputSummary } from '../sharedComponents/Input'; 
import { serverCalls } from '../../api';
import { Drawer as MUIDrawer, Button, Grid, TextField } from '@mui/material';

const myStyles = {
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
}

interface RecipeFormProps {
    id?: string;
    data?: {};
}

interface RecipeDataState {
    recipeid: string;
    title: string;
    image_url: string;
    servings: number;
    ready_in_min: number;
    source_url: string;
    num_likes: string;
    cuisines: string;
    summary: string;
    token: string;
}

export const AddRecipeForm = (props: RecipeFormProps) => {
    const dispatch = useDispatch();
    const store = useStore();
    const { register, handleSubmit } = useForm({});

    const onSubmit = async (data: any, event:any) => {
        dispatch(chooseTitle(data.title))
        dispatch(chooseImageURL(data.image_url))
        dispatch(chooseServings(data.servings))
        dispatch(chooseReadyTime(data.ready_in_min))
        dispatch(chooseCuisines(data.cuisines))
        dispatch(chooseSummary(data.summary))
        dispatch(chooseToken(localStorage.getItem('token')))
        await serverCalls.create(store.getState())
        window.location.reload()
    }
    return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item>
                <Input required {...register('title')} name='title' label='Enter Recipe Title'/>
            </Grid>
            <Grid item>
                <Input required {...register('image_url')} name='image_url' label='Enter Image URL'/>
            </Grid>
            <Grid item>
                <Input required {...register('servings')} name='servings' label='Enter Number of Servings'/>
            </Grid>
            <Grid item>
                <Input required {...register('ready_in_min')} name='ready_in_min' label='Enter Total Prep & Cook Time in Minutes'/>
            </Grid>
            <Grid item>
                <Input required {...register('cuisines')} name='cuisines' label='Enter Cuisine Type'/>
            </Grid>
            <Grid item>
                <InputSummary required {...register('summary')} name='summary' label='Enter Brief Summary About Recipe'/>
            </Grid>
            <Button type='submit' sx={myStyles.submitButton}>Submit</Button>
        </form>
    </div>
    )
}

export const UpdateRecipeForm = (props: RecipeFormProps) => {
    const dispatch = useDispatch();
    const store = useStore();
    const { register, handleSubmit } = useForm({});
    const [recipe, setRecipe] = useState<any>({});

    const recipeInfo = async () => {
        let id = localStorage.getItem('id')
        const response = await serverCalls.getOne(id)
        setRecipe(await response)
    };

    useEffect(() => {
        recipeInfo()
    }, [])

    const onSubmit = async (data: any, event:any) => {
        dispatch(chooseTitle(data.title))
        dispatch(chooseImageURL(data.image))
        dispatch(chooseServings(data.servings))
        dispatch(chooseReadyTime(data.readyTime))
        dispatch(chooseSourceURL(data.source))
        dispatch(chooseCuisines(data.cuisines))
        dispatch(chooseSummary(data.summary))
        let id = localStorage.getItem('id')
        data.id = id
        data.recipeid = localStorage.getItem('recipeid')
        data.num_likes = localStorage.getItem('num_likes')
        data.token = localStorage.getItem('token')
        console.log(data, 'updated data')
        await serverCalls.update(id!, data)
        window.location.reload()
    }

    return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item>
                <TextField 
                    required {...register('title')} 
                    name='title' label='Recipe Title' 
                    defaultValue={`${localStorage.getItem('title')}`}
                    variant = 'outlined'
                    margin = 'dense'
                    fullWidth
                    type = 'text'
                    sx={{
                        input: {
                            color: '#66513e',
                            fontFamily: 'gelasio',
                        },
                        label: {
                            color: '#66513e',
                            fontFamily: 'gelasio',
                        }
                }}></TextField>
            </Grid>
            <Grid item>
                <TextField 
                    required {...register('image_url')} 
                    name='image_url' label='Image URL' 
                    defaultValue={`${localStorage.getItem('image_url')}`}
                    variant = 'outlined'
                    margin = 'dense'
                    fullWidth
                    type = 'text'
                    sx={{
                        input: {
                            color: '#66513e',
                            fontFamily: 'gelasio',
                        },
                        label: {
                            color: '#66513e',
                            fontFamily: 'gelasio',
                        }
                }}></TextField>
            </Grid>
            <Grid item>
                <TextField 
                    required {...register('servings')} 
                    name='servings' label='Number of Servings' 
                    defaultValue={`${localStorage.getItem('servings')}`}
                    variant = 'outlined'
                    margin = 'dense'
                    fullWidth
                    type = 'text'
                    sx={{
                        input: {
                            color: '#66513e',
                            fontFamily: 'gelasio',
                        },
                        label: {
                            color: '#66513e',
                            fontFamily: 'gelasio',
                        }
                }}></TextField>
            </Grid>
            <Grid item>
                <TextField 
                    required {...register('ready_in_min')} 
                    name='ready_in_min' label='Total Prep & Cook Time in Minutes' 
                    defaultValue={`${localStorage.getItem('ready_in_min')}`}
                    variant = 'outlined'
                    margin = 'dense'
                    fullWidth
                    type = 'text'
                    sx={{
                        input: {
                            color: '#66513e',
                            fontFamily: 'gelasio',
                        },
                        label: {
                            color: '#66513e',
                            fontFamily: 'gelasio',
                        }
                }}></TextField>
            </Grid>
            <Grid item>
                <TextField 
                    required {...register('source_url')} 
                    name='source_url' label='Source URL' 
                    defaultValue={`${localStorage.getItem('source_url')}`}
                    variant = 'outlined'
                    margin = 'dense'
                    fullWidth
                    type = 'text'
                    sx={{
                        input: {
                            color: '#66513e',
                            fontFamily: 'gelasio',
                        },
                        label: {
                            color: '#66513e',
                            fontFamily: 'gelasio',
                        }
                }}></TextField>
            </Grid>
            <Grid item>
                <TextField 
                    required {...register('cuisines')} 
                    name='cuisines' label='Cusine Type' 
                    defaultValue={`${localStorage.getItem('cuisines')}`}
                    variant = 'outlined'
                    margin = 'dense'
                    fullWidth
                    type = 'text'
                    sx={{
                        input: {
                            color: '#66513e',
                            fontFamily: 'gelasio',
                        },
                        label: {
                            color: '#66513e',
                            fontFamily: 'gelasio',
                        }
                }}></TextField>
            </Grid>
            <Grid item>
                <TextField 
                    required {...register('summary')} 
                    name='summary' label='Recipe Summary' 
                    defaultValue={`${localStorage.getItem('summary')}`}
                    variant = 'outlined'
                    margin = 'dense'
                    fullWidth
                    multiline
                    type = 'text'
                    sx={{
                        input: {
                            color: '#66513e',
                            fontFamily: 'gelasio',
                        },
                        label: {
                            color: '#66513e',
                            fontFamily: 'gelasio',
                        }
                }}></TextField>
            </Grid>
            <Button type='submit' sx={myStyles.submitButton}>Submit</Button>
        </form>
    </div>
    )
}