import { createSlice } from '@reduxjs/toolkit'
import { registerUserThunk, loginUserThunk, logoutUserThunk, getUserProfileThunk, getOtherUserThunk } from './user.thunk';

const initialState = {
    isAuthenticated: false,
    screenLoading: true,
    userProfile : null,
    otherUsers : null,
    selectedUser: JSON.parse(localStorage.getItem("selectedUser")),
    buttonLoading: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSelectedUser: (state, action) =>{
            localStorage.setItem("selectedUser", JSON.stringify(action.payload));
            state.selectedUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        // login user first
        builder.addCase(loginUserThunk.pending, (state, action) => {
            state.buttonLoading = true;
        });
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {
            
            state.userProfile = action.payload?.user;
            state.isAuthenticated = true;
            state.buttonLoading = false;
        });
        builder.addCase(loginUserThunk.rejected, (state, action) => {
            state.buttonLoading = false;
        });
        
        //register user first
        builder.addCase(registerUserThunk.pending, (state, action) => {
            state.buttonLoading = true;
        });
        builder.addCase(registerUserThunk.fulfilled, (state, action) => {
            
            state.userProfile = action.payload?.responseData?.user;
            state.isAuthenticated = true;
            state.buttonLoading = false;
        });
        builder.addCase(registerUserThunk.rejected, (state, action) => {
            state.buttonLoading = false;
        });

        //logout user
        builder.addCase(logoutUserThunk.pending, (state, action) => {
            state.buttonLoading = true;
        });
        builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
            
            state.userProfile = null;
            state.selectedUser = null;
            state.otherUsers = null;
            state.isAuthenticated = false;
            state.buttonLoading = false;
            localStorage.clear();
        });
        builder.addCase(logoutUserThunk.rejected, (state, action) => {
            state.buttonLoading = false;
        });

        //get user profile
        builder.addCase(getUserProfileThunk.pending, (state, action) => {
        });
        builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.screenLoading = false;
            state.userProfile = action.payload?.responseData;
        });
        builder.addCase(getUserProfileThunk.rejected, (state, action) => {
            state.screenLoading = false;
        });


        //get other users
        builder.addCase(getOtherUserThunk.pending, (state, action) => {
            state.screenLoading = true;
        });
        builder.addCase(getOtherUserThunk.fulfilled, (state, action) => {
            state.screenLoading = false;
            state.otherUsers = action.payload?.responseData;  // this will be an array of users. If no user found, it will be an empty array.  // this is just for demonstration purposes. In a real-world application, you'd have to handle this case properly.  // In the actual application, you'd fetch users from the server. For now, we just simulate it.  // In the actual application, you'd fetch users from the server. For now, we just
            console.log(action.payload);

        });
        builder.addCase(getOtherUserThunk.rejected, (state, action) => {
            state.screenLoading = false;
        });
    },
})

export const { setSelectedUser } = userSlice.actions

export default userSlice.reducer;