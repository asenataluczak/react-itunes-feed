import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AlbumInterface from '../interfaces/album.interface';

interface AlbumListState {
  updated: string;
  albums: Array<AlbumInterface>;
}

// Define the initial state using that type
const initialState: AlbumListState = {
  updated: '',
  albums: [],
};

export const albumListSlice = createSlice({
  name: 'albumList',
  initialState,
  reducers: {
    update: (state, { payload }: PayloadAction<AlbumListState>) => {
      state.updated = payload.updated;
      state.albums = payload.albums;
    },
  },
});

// Action creators are generated for each case reducer function
export const { update } = albumListSlice.actions;

export default albumListSlice.reducer;
