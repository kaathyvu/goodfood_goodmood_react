import React, {useState} from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseRecipeId, chooseTitle, chooseImageURL, chooseServings, chooseReadyTime, chooseSourceURL, 
    chooseNumLikes, chooseCuisine, chooseSummary, chooseToken } from '../../redux/slices/rootSlice'
import { Input } from '../sharedComponents/Input'; 
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { Drawer as MUIDrawer, Button, Grid, } from '@mui/material';

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
    cuisine: string;
    summary: string;
    token: string;
}

export const RecipeForm = (props: RecipeFormProps) => {
    const dispatch = useDispatch();
    let { recipeData, getData } = useGetData();
    const store = useStore();
    const { register, handleSubmit } = useForm({});

    const onSubmit = async (data: any, event:any) => {
        console.log(props.id)

        if(props.id!) {
            await serverCalls.update(props.id!, data)
            console.log(`Updated: ${data} ${props.id}`)
            window.location.reload()
            event.target.reset()
        } else {
            dispatch(chooseTitle(data.title))
            dispatch(chooseImageURL(data.image_url))
            dispatch(chooseServings(data.servings))
            dispatch(chooseReadyTime(data.ready_in_min))
            dispatch(chooseCuisine(data.cuisine))
            dispatch(chooseSummary(data.summary))
            dispatch(chooseToken(localStorage.getItem('token')))
            await serverCalls.create(store.getState())
            window.location.reload()
        }
    }
    return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item>
                <Input required {...register('title')} name='title' label='Enter Recipe Title'/>
            </Grid>
            <Grid item>
                <Input {...register('image_url')} name='image_url' label='Enter Image URL'/>
            </Grid>
            <Grid item>
                <Input {...register('servings')} name='servings' label='Enter Number of Servings'/>
            </Grid>
            <Grid item>
                <Input {...register('ready_in_min')} name='ready_in_min' label='Enter Total Prep & Cook Time in Minutes'/>
            </Grid>
            <Grid item>
                <Input {...register('cuisine')} name='cuisine' label='Enter Cuisine Type'/>
            </Grid>
            <Grid item>
                <Input {...register('summary')} name='summary' label='Enter Brief Summary About Recipe'/>
            </Grid>
            <Button type='submit' sx={myStyles.submitButton}>Submit</Button>
        </form>
    </div>
    )
}