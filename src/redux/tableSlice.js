import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    countData: ""
}

const tableSlice = createSlice({
    name: 'tableSlice',
    initialState,
    reducers:{
        getCountData: (state,action)=>{
            Object.assign(state,{},{
                countData: action.payload
            })
        }
    }
})

export const { getCountData } = tableSlice.actions

export default tableSlice.reducer

