import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers } from './usersApi';

export interface CounterState {
    value: number;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
    value: 0,
    status: 'idle',
};

export const fetchUsersFromAPI = createAsyncThunk(
    'users/fetchCount',
    async (amount: number) => {
        return await fetchUsers(amount);
    }
);

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
});

export const { incrementByAmount } = usersSlice.actions;

export default usersSlice.reducer;