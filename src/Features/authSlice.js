import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    user:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const LoginUser = createAsyncThunk("user/LoginUser",async(user,thunkAPI)=>{

    try{
        const response = await axios.post('http://localhost:5000/login', {
            email: user.email,
            password: user.password
        });
        return response.data;

    }catch(error){
        if(error.response){
            const message =error.response.data.msg
            return thunkAPI.rejectWithValue(message);
        }

    }
});

export const getMe = createAsyncThunk("user/getMe", async(_, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:5000/me');
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const LogOut = createAsyncThunk("user/LogOut", async() => {
    await axios.delete('http://localhost:5000/logout');
});


export const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    /**En utilisant builder.addCase(), nous pouvons regrouper tous les cas supplémentaires dans une seule configuration. Cela rend le code plus lisible et plus facile à gérer, en particulier lorsque vous avez plusieurs cas supplémentaires à gérer pour différentes actions. */
    extraReducers:(builder) =>{
        builder.addCase(LoginUser.pending,(state)=>{
            state.isLoading=true;
        });
        builder.addCase(LoginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.user=action.payload;
        });
        builder.addCase(LoginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload;
        })



        // Get User Login
        builder.addCase(getMe.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            /*represents the data carried by a dispatched Redux action. An action is a plain JavaScript object that typically contains two properties:

type: A string that identifies the type of action being dispatched (e.g., "LOGIN_SUCCESS", "LOGOUT").
payload: An optional object containing the actual data associated with the action. In this case, the payload likely holds the user information retrieved after a successful login or fetched from the server.*/
        });
        builder.addCase(getMe.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    
    }
    });
    export const {reset}=authSlice.actions;





    
    export default authSlice.reducer;