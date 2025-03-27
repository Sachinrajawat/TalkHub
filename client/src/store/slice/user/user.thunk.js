import { createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";
import { axiosInstance } from "../../../components/utilities/axiosInstance";

export const loginUserThunk = createAsyncThunk("user/login",
    async ({username, password}, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/user/login',{
            username,
            password,
        });
        toast.success("Login successful");
        return response.data;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});


export const registerUserThunk = createAsyncThunk("user/logout",
    async ({fullName, username, password, gender}, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/user/register',{
            fullName,
            username,
            password,
            gender,
        });
        toast.success("Registration successfull!");
        return response.data;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});

export const logoutUserThunk = createAsyncThunk("user/signup",
    async (_, { rejectWithValue }) => {
        try {
        const response = await axiosInstance.post('/user/logout');
        toast.success("Logout successfull!");
        return response.data;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});

export const getUserProfileThunk = createAsyncThunk("user/getProfile",
    async (_, { rejectWithValue }) => {
        try {
        const response = await axiosInstance.get('/user/get-profile');
        return response.data;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage
        return rejectWithValue(errorOutput);
    }
});

export const getOtherUserThunk = createAsyncThunk("user/getOtherUsers",
    async (_, { rejectWithValue }) => {
        try {
        const response = await axiosInstance.get('/user/get-other-users');
        return response.data;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage
        return rejectWithValue(errorOutput);
    }
});
