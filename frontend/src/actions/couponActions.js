import axios from 'axios'
import {
  COUPON_LIST_REQUEST,
  COUPON_LIST_SUCCESS,
  COUPON_LIST_FAIL,
  COUPON_DETAILS_REQUEST,
  COUPON_DETAILS_SUCCESS,
  COUPON_DETAILS_FAIL,
  COUPON_DELETE_SUCCESS,
  COUPON_DELETE_REQUEST,
  COUPON_DELETE_FAIL,
  COUPON_CREATE_REQUEST,
  COUPON_CREATE_SUCCESS,
  COUPON_CREATE_FAIL,
  COUPON_VERIFY_REQUEST,
  COUPON_VERIFY_SUCCESS,
  COUPON_VERIFY_FAIL,
  COUPON_UPDATE_REQUEST,
  COUPON_UPDATE_SUCCESS,
  COUPON_UPDATE_FAIL
} from '../constants/couponConstants';
import { logout } from './userActions'
const addCoupon = () => async (dispatch,getState) => {
    try{

        dispatch({
            type: COUPON_CREATE_REQUEST,
        })
      
        const{
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = await axios.post('/api/coupon/addcoupon',{},config);        
        dispatch({
            type: COUPON_CREATE_SUCCESS,
            payload: data
            
        })
    } catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
        type: COUPON_CREATE_FAIL,
        payload: message,
        })
    }    
}

const verifyCoupon = (couponCode) => async dispatch =>{
    try {
        dispatch({
            type: COUPON_VERIFY_REQUEST, 
        });

        const {data} = await axios.post(`/api/coupon/verify/${couponCode}`);
        console.log(data);
        dispatch({
            type: COUPON_VERIFY_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: COUPON_VERIFY_FAIL,
            payload: message,
        })
    }
}

const couponList = () => async (dispatch,getState) =>{
    try {
        dispatch({
            type: COUPON_LIST_REQUEST
        })

        const{
            userLogin: { userInfo },
        } = getState()
        
        const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
        }
        console.log(config);
        const {data} = await axios.post('/api/coupon/list',{},config);
        dispatch({
            type: COUPON_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
        type: COUPON_LIST_FAIL,
        payload: message,
        })
    }
}
const deleteCoupon = (id) => async (dispatch,getState) =>{
    try {
        dispatch({
            type: COUPON_DELETE_REQUEST
        })

        const{
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const {data} = await axios.delete(`/api/coupon/${id}`,config);
        dispatch({
            type: COUPON_DELETE_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
        type: COUPON_DELETE_FAIL,
        payload: message,
        })
    }
}
const updateCoupon = (id,couponCode,discount,limit,valid) => async (dispatch,getState) =>{
    try {
        dispatch({
            type: COUPON_UPDATE_REQUEST
        })

        const{
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const {data} = await axios.put(`/api/coupon/${id}`,{couponCode,discount,limit,valid},config);
        console.log(data);
        dispatch({
            type: COUPON_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
        type: COUPON_UPDATE_FAIL,
        payload: message,
        })
    }
}
const couponDetails = (id) => async (dispatch,getState) =>{
    try {
        dispatch({
            type: COUPON_DETAILS_REQUEST
        })

        const{
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const {data} = await axios.post(`/api/coupon/${id}`,{},config);
        dispatch({
            type: COUPON_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
        type: COUPON_DETAILS_FAIL,
        payload: message,
        })
    }
}

export {
    addCoupon,
    verifyCoupon,
    couponDetails,
    updateCoupon,
    deleteCoupon,
    couponList
}