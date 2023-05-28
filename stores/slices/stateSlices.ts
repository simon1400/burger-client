import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from 'stores';

export interface State {
  modal: boolean;
}

const initialState: State = {
  modal: false
}

export const stateReducer = createSlice({
  name: 'state',
  initialState,
  reducers: {
    changeModal: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload
    },
  },

  extraReducers: {
    [HYDRATE]: (state: State, action: any) => {
      return {
        ...state,
        ...action.payload.state,
      };
    }
  },
})

export const { 
  changeModal,
} = stateReducer.actions

export const selectAllState = (state: AppState) => state.state;

export default stateReducer.reducer