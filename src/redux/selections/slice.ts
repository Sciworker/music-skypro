import { createSlice } from '@reduxjs/toolkit';
import { fetchAllSelections, fetchSelectionById } from './asyncActions';
import { Selection } from './types';

interface SelectionsState {
  selections: Selection[];
  selection: Selection | null;
  loading: boolean;
  error: string | null;
}

const initialState: SelectionsState = {
  selections: [],
  selection: null,
  loading: false,
  error: null,
};

const selectionsSlice = createSlice({
  name: 'selections',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSelections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSelections.fulfilled, (state, action) => {
        state.selections = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllSelections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error occurred while fetching all selections';
      });

    builder
      .addCase(fetchSelectionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSelectionById.fulfilled, (state, action) => {
        state.selection = action.payload;
        state.loading = false;
      })
      .addCase(fetchSelectionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error occurred while fetching selection by id';
      });
  }
});

export default selectionsSlice.reducer;
