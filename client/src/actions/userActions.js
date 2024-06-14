import {
    loginRequest, loginSuccess, loginFail,
    registerRequest, registerSuccess, registerFail,
    isLoginRequest, isLoginSuccess, isLoginFail,
    getUserRequest, getUserSuccess, getUserFail
} from '../slices/userSlice';

import axios from 'axios'
import {toast} from 'react-toastify';




export const loginUser = (userData) => async (dispatch) => {
    try {
        dispatch(loginRequest())


        const { data } = await axios.post(`https://meal-matrix-backend.onrender.com/api/auth/login`, userData)

        dispatch(loginSuccess())
      
        localStorage.setItem('accesstoken', data.token)
        toast.success("Login Successful !")
    } catch (err) {
        dispatch(loginFail(err.response.data.message))
        toast.error(err.response.data.message)
    }
}

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch(registerRequest())


        const { data } = await axios.post(`https://meal-matrix-backend.onrender.com/api/auth/register`, userData)

        dispatch(registerSuccess())
        localStorage.setItem('accesstoken', data.token)
        toast.success("Register Successful !")
    } catch (err) {
        dispatch(registerFail(err.response.data.message))
        if (err.response.data.message.includes("duplicate")) {
            toast.error("User already exists")
        } else {
            toast.error(err.response.data.message)
        }
    }
}

export const IsLogin = () => async (dispatch) => {
    try {
        dispatch(isLoginRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            }
        }
        
        const { data } = await axios.get(`https://meal-matrix-backend.onrender.com/api/auth/verify`, config)
        
        // console.log("data", data )

        dispatch(isLoginSuccess(data))
    

    } catch (err) {
        dispatch(isLoginFail(err.response.data.message))
    }
}





export const getUser = () => async (dispatch) => {
    try {
        dispatch(getUserRequest())
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            }
        }

        const { data } = await axios.get(`https://meal-matrix-backend.onrender.com/api/user`, config);

        dispatch(getUserSuccess(data.user))

    } catch (err) {
        dispatch(getUserFail())
    }
}
