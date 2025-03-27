import { createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";
import { axiosInstance } from "../../../components/utilities/axiosInstance";

export const sendMessageThunk = createAsyncThunk("message/send",
    async ({receiverId, message}, { rejectWithValue }) => {
    // console.log(receiverId,message);
        try {
        const response = await axiosInstance.post(`/message/send/${receiverId}`,{
            message
        });
        return response.data;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});


export const getMessageThunk = createAsyncThunk("message/get",
    async ({receiverId}, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/message/get-messages/${receiverId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        const errorOutput = error?.response?.data?.errMessage
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});

