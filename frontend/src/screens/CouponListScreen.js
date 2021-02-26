import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const CouponListScreen = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
        dispatch(listOrders())
        } else {
        history.push('/login')
        }
    }, [dispatch, history, userInfo])
    return (
        <div>
            
        </div>
    )
}

export default CouponListScreen
