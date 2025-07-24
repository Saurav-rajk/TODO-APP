import { createSlice, configureStore} from "@reduxjs/toolkit";
const authSIice = createSlice({
    name:"auth",
    initialState: {user:"", isLoggedIn: false},
    reducers: {
        login(state){
            state.isLoggedIn=true;
        },
        logout(state){
            state.isLoggedIn=false;
        },
    },
});

export const authActions = authSIice.actions;
export const store = configureStore({reducer: authSIice. reducer,})
