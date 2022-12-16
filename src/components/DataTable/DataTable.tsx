import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Grid } from '@mui/material';
import { serverCalls } from '../../api';
import { useNavigate, Link } from 'react-router-dom';

const myStyles = {
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
        position: 'relative'
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
            backgroundColor: 'white',
            paddingTop: '0vh',
            marginBottom: '0.5vh'
        },
    }, 
    heart: {
        color: "#d32f2f",
        backgroundColor: 'white',
        position: 'absolute',
        top: '1.25vh',
        right: '1.5vh',
        padding: '0.5vh',
        "&:hover": {
            backgroundColor: 'white'
        }
    },
}

interface gridData{
    data: {
        id?: string;
    }
};

export const DataTable = () => {
    const [recipeData, setData] = useState<any>([]);
    let [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const getId = (id:any) => {
        localStorage.setItem('id', id)
        navigate('/savedrecipe')
    };

    const getData = async () => {
        const result = await serverCalls.get();
        setData(result);
    }

    useEffect( () => {
        getData();
    }, [])

    return (
        <Grid container sx={myStyles.resultRow1}>
            {recipeData.map((item:any) => (
                <Grid item xs={3.5} sx={myStyles.resultBox}>
                    <ul>
                    <img id='result-img' src={item.image_url} alt="Recipe" onClick={() => getId(item.id)} />
                    <center>
                            <Button sx={myStyles.textH6} onClick={() => getId(item.id)}>{item.title}</Button></center>
                    </ul>
                </Grid>
            ))}
        </Grid>
    )
}