import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    accessToken: null,
    isAuthenticated: false,
    userDetails: {
        firstname: '',
        lastname: '',
        email: '',
        website: '',
        company: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        image_url: null,
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => void (state.currentUser = action.payload),
        setToken: (state, action) => void (state.accessToken = action.payload),
        setIsAuthenticated: (state, action) => void (state.isAuthenticated = action.payload),
        setUserDetails: (state, action) => void (state.userDetails = action.payload),
        logOut: (state) => {
            state.currentUser = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.userDetails = {
                firstname: '',
                lastname: '',
                email: '',
                website: '',
                company: '',
                phone: '',
                address: '',
                city: '',
                pincode: '',
                image_url: null,
            };
        }
    },
});

export const {
    setCurrentUser,
    setToken,
    setIsAuthenticated,
    setUserDetails,
    logOut
} = userSlice.actions;

export default userSlice.reducer;
