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
    COUPON_CREATE_RESET,
    COUPON_VERIFY_REQUEST,
    COUPON_VERIFY_SUCCESS,
    COUPON_VERIFY_REST,
    COUPON_VERIFY_FAIL,
    COUPON_UPDATE_REQUEST,
    COUPON_UPDATE_SUCCESS,
    COUPON_UPDATE_FAIL,
    COUPON_UPDATE_RESET
} from '../constants/couponConstants';


export const couponVerifyReducer = (state ={},action) =>{
    switch(action.type){
        case COUPON_VERIFY_REQUEST:
        return {
            loading: true,
        }

        case COUPON_VERIFY_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            }
        
        case COUPON_VERIFY_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        
        case COUPON_VERIFY_REST:
            return {}
        
        default:
            return state;

    }
}

export const couponAddReducer = (state ={}, action) =>{
    switch(action.type){
        case COUPON_CREATE_REQUEST:
            return {
                loading : true,
            }
        
        case COUPON_CREATE_SUCCESS:
            return {
                loading : false,
                success: action.payload,
            }
        
        case COUPON_CREATE_FAIL:
            return {
                loading : false,
                error: action.payload,
            }
        case COUPON_CREATE_RESET:
            return {}
        default:
            return state;
    }
}
export const couponListReducer = (state ={}, action) =>{
    switch(action.type){
        case COUPON_LIST_REQUEST:
            return {
                loading : true,
            }

        case COUPON_LIST_SUCCESS:
            return {
                list: action.payload,
                loading : false,
            }

        case COUPON_LIST_FAIL:
            return {
                error: action.payload,
                loading : false,
            }

        default:
            return state;
    }
}
export const couponUpdateReducer = (state ={}, action) =>{
    switch(action.type){
        case COUPON_UPDATE_REQUEST:
            return {
                loading : true,
            }
        case COUPON_UPDATE_SUCCESS:
            return {
                loading : false,
                success: action.payload,
            }
        case COUPON_UPDATE_FAIL:
            return {
                loading : false,
                error: action.payload,
            }        
        case COUPON_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}
export const couponDetailsReducer = (state ={}, action) =>{
    switch(action.type){
        case COUPON_DETAILS_REQUEST:
            return {
                loading : true,
            }
        
        case COUPON_DETAILS_SUCCESS:
            return {
                loading : false,
                couponDetails: {...action.payload},
            }
        
        case COUPON_DETAILS_FAIL:
            return {
                loading : false,
                error: action.payload,
            }        

        default:
            return state;
    }
}
export const couponDeleteReducer = (state ={}, action) =>{
    switch(action.type){
        case COUPON_DELETE_REQUEST:
            return {
                loading : true,
            }
        
        case COUPON_DELETE_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            }
        case COUPON_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }        

        default:
            return state;
    }
}