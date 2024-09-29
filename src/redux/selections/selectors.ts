import { RootState } from '../store';

export const selectSelections = (state: RootState) => state.selections.selections;
export const selectSelection = (state: RootState) => state.selections.selection;
export const selectSelectionsLoading = (state: RootState) => state.selections.loading;
export const selectSelectionsError = (state: RootState) => state.selections.error;
