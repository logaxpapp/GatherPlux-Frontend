import { createSlice } from "@reduxjs/toolkit";
import { getCookie, isTokenValid, removeCookie } from "@/utils/cookie.utility";

const token = getCookie("token") as string | "{}";
let accessToken: { access_token: string; role: string } = {
  access_token: "",
  role: "",
};
try {
  accessToken =
    token !== "" && token !== "{}" && token !== undefined && token !== null
      ? JSON.parse(token)
      : null;
} catch (error) {
  console.error("Error parsing token:", error);
}

const isTokenValidAndNotExpired = isTokenValid(accessToken?.access_token);

if (!isTokenValidAndNotExpired) {
  removeCookie("token");
}

const initialState = {
  accessToken: isTokenValidAndNotExpired ? accessToken.access_token : null,
  role: isTokenValidAndNotExpired ? JSON.parse(token).role : null,
  userDetails: {
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    website: "",
    company: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    image_url: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => void (state.accessToken = action.payload),
    setRole: (state, action) => void (state.role = action.payload),
    setUserDetails: (state, action) =>
      void (state.userDetails = action.payload),
    logOut: (state) => {
      state.accessToken = null;
      state.role = null;
      state.userDetails = {
        id: 0,
        firstname: "",
        lastname: "",
        email: "",
        website: "",
        company: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        image_url: null,
      };
    },
  },
});

export const { setToken, setRole, setUserDetails, logOut } = userSlice.actions;

export default userSlice.reducer;
