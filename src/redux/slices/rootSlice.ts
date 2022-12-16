import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        recipeid: '',
        title: "Recipe Title",
        image_url: '',
        servings: '',
        ready_in_min: 30,
        source_url: '',
        num_likes: 1,
        cuisines: '',
        summary: '',
        token: '',
    },
    reducers: {
        chooseRecipeId: (state,action) => { state.recipeid = action.payload },
        chooseTitle: (state,action) => { state.title = action.payload },
        chooseImageURL: (state,action) => { state.image_url = action.payload },
        chooseServings: (state,action) => { state.servings = action.payload },
        chooseReadyTime: (state,action) => { state.ready_in_min = action.payload },
        chooseSourceURL: (state,action) => { state.source_url = action.payload },
        chooseNumLikes: (state,action) => { state.num_likes = action.payload },
        chooseCuisines: (state,action) => { state.cuisines = action.payload },
        chooseSummary: (state,action) => { state.summary = action.payload },
        chooseToken: (state,action) => { state.token = action.payload },
    }
})

export const reducer = rootSlice.reducer;
export const {chooseRecipeId, chooseTitle, chooseImageURL, chooseServings, chooseReadyTime, chooseSourceURL, 
    chooseNumLikes, chooseCuisines, chooseSummary, chooseToken} = rootSlice.actions