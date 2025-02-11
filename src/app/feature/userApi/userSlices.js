import { createSlice } from '@reduxjs/toolkit';

const loadUserFromLocalStorage = () => {
  try {
    const storedUserId = localStorage.getItem('id');
    if (storedUserId === null) return { id: null }; // Ensure default structure
    return { id: JSON.parse(storedUserId) };
  } catch (error) {
    return { id: null }; // Return a safe fallback state
  }
};

const initialState = loadUserFromLocalStorage();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload; // Set the ID from payload
      localStorage.setItem('id', JSON.stringify(state.id)); // Correctly store the ID
    },
    removeUser: (state) => {
      state.id = null;
      localStorage.removeItem('id');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;