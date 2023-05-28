import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from 'stores';

export interface NavState {
  title: string;
  description: string;
  published: string;
  category: string;
  updated: string;
  noCrawl: boolean
  tags: string;
  image: string;
  ogTitle: string;
  ogDescription: string;
  contentType: string;
  themeColor: string;
  siteName: string;
  siteUrl: string;
}

const initialState: NavState = {
  title: "",
  description: "",
  published: "",
  category: "",
  updated: "",
  noCrawl: false,
  tags: "",
  image: "",
  ogTitle: "",
  ogDescription: "",
  contentType: "website",
  themeColor: "#2a82a9",
  siteName: 'Craftwork',
  siteUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3004' : 'https://craftwork.cz'
}

export const metaReducer = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    changeDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    changePublished: (state, action: PayloadAction<string>) => {
      state.published = action.payload
    },
    changeCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
    changeNoCrawl: (state, action: PayloadAction<boolean>) => {
      state.noCrawl = action.payload
    },
    changeUpdated: (state, action: PayloadAction<string>) => {
      state.updated = action.payload
    },
    changeImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload
    },
    changeOgTitle: (state, action: PayloadAction<string>) => {
      state.ogTitle = action.payload
    },
    changeOgDescription: (state, action: PayloadAction<string>) => {
      state.ogDescription = action.payload
    },
    changeContentType: (state, action: PayloadAction<string>) => {
      state.contentType = action.payload
    },
  },

  extraReducers: {
    [HYDRATE]: (state: NavState, action: any) => {
      return {
        ...state,
        ...action.payload.meta,
      };
    }
  },
})

export const { 
  changeTitle,
  changeDescription,
  changePublished,
  changeCategory,
  changeNoCrawl,
  changeUpdated,
  changeImage,
  changeOgTitle,
  changeOgDescription,
  changeContentType
} = metaReducer.actions

export const selectAllMeta = (state: AppState) => state.meta;

export default metaReducer.reducer