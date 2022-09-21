import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, name: 'Alex' },
  { id: 2, name: 'Alexa' },
  { id: 3, name: 'Alexander' },
];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default userSlice.reducer;
