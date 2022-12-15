import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { Button, Checkbox, Grid } from '@mui/material';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

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
}

interface gridData{
    data: {
        id?: string;
    }
};

const columns: GridColDef[] = [
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 90 },
    {
        field: 'recipeid',
        headerName: 'Recipe ID',
        width: 90,
        editable: true,
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 150,
        editable: true,
    },
    {
        field: 'image_url',
        headerName: 'Image URL',
        width: 110,
        editable: true,
    },
    {
        field: 'servings',
        headerName: 'servings',
        width: 90,
        editable: true,
        type: 'number',
    },
    {
        field: 'ready_in_min',
        headerName: 'Ready Time',
        width: 90,
        editable: true,
        type: 'number',
    },
    {
        field: 'source_url',
        headerName: 'Source URL',
        width: 110,
        editable: true,
    },
    {
        field: 'num_likes',
        headerName: 'Number of Likes',
        width: 110,
        editable: true,
        type: 'number',
    },
    {
        field: 'cuisine',
        headerName: 'Cuisine',
        width: 110,
        editable: true,
    },
    {
        field: 'summary',
        headerName: 'Summary',
        width: 110,
        editable: true,
        type: 'number',
    },
    {
        field: 'token',
        headerName: 'Token',
        width: 110,
        editable: true,
    },
];

export const DataTable = () => {
    let { recipeData, getData } = useGetData();
    let [open, setOpen] = useState(false);

    let handleOpen = () => {
        setOpen(true);
    };

    let handleClose = () => {
        setOpen(false);
    };

    let deleteData = () => {
        // serverCalls.delete(`${gridData[0]}`)
        getData()
        window.location.reload()
    };

    console.log(recipeData)

    return (
        <Grid container sx={myStyles.resultRow1}>
            {recipeData.slice(0,6).map((item:any) => (
                <Grid item xs={3.5} sx={myStyles.resultBox}>
                    <ul>
                    <img id='result-img' src={recipeData.image_url} alt="Recipe"/>
                    <center><Button sx={myStyles.textH6}>{item.title}</Button></center>
                    <Button><Checkbox icon={<Favorite/>} checkedIcon={<FavoriteBorder/>}/>SAVE THIS RECIPE</Button>
                    </ul>
                </Grid>
            ))}</Grid>
        // <div style={{ height: 400, width: '100%' }}>
        //     <DataGrid
        //         rows={recipeData}
        //         columns={columns}
        //         pageSize={6}
        //         rowsPerPageOptions={[6]}
        //         checkboxSelection
        //         onSelectionModelChange= {(newSelectionModel) => {setData(newSelectionModel);}}
        //         {...recipeData}
        //     />
        //     {/* Pop up Functionality for Update & Delete Buttons */}
        //     <Button onClick={handleOpen} variant='contained'>Update</Button>
        //     <Button onClick={deleteData} variant='contained' color='error'>Delete</Button>

        //     {/* Dialog Open */}
        //     <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        //         <DialogTitle id='form-dialog-title'>Update Drone</DialogTitle>
        //         <DialogContent>
        //             <DialogContentText></DialogContentText>
        //                 <RecipeForm id={`${gridData[0]}`}/>
        //         </DialogContent>
        //         <DialogActions>
        //             <Button onClick = {handleClose} color = "error">Cancel</Button>
        //         </DialogActions>
        //     </Dialog>
        // </div>
    )
}