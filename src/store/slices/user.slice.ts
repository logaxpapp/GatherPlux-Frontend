import { createSlice } from "@reduxjs/toolkit";
import { getCookie, isTokenValid, removeCookie } from "@/utils/cookie.utility";

const token = getCookie('token') as string;
const isTokenValidAndNotExpired = isTokenValid(token);

if (!isTokenValidAndNotExpired) {
    removeCookie('token');
}

const initialState = {
    currentUser: null,
    accessToken: isTokenValidAndNotExpired ? token : null,
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
        setUserDetails: (state, action) => void (state.userDetails = action.payload),
        logOut: (state) => {
            state.currentUser = null;
            state.accessToken = null;
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
    setUserDetails,
    logOut
} = userSlice.actions;

export default userSlice.reducer;
