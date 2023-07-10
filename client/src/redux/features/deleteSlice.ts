import {createSlice} from '@reduxjs/toolkit';

export type ShowDeleteState={
    value:boolean;
}

const initialState={
    value:false,
} as ShowDeleteState

export const showDelete=createSlice({
    name:"showDelete",
    initialState,
    reducers:{
        click:(state)=>{
            state.value=!state.value;
        }
    }
})

export const click =showDelete.actions.click;
export default showDelete.reducer;