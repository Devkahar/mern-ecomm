import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { deleteCoupon,addCoupon, couponList } from '../actions/couponActions'
import { COUPON_CREATE_RESET } from '../constants/couponConstants'
const CouponListScreen = ({ history, match }) => {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const couponsList = useSelector((state) => state.couponList);
    const {
        loading,
        list,
        error
    } = couponsList;

    const couponCreate = useSelector((state) => state.couponAdd);
    const {
        loading: couponLoading, 
        success,
        error: couponError
    } = couponCreate;
    
    const deleteCoupons = useSelector((state) => state.couponDelete);
    const {
        loading: deleteLoading,
        success: deleteSuccess,
        error: deleteError
    } = deleteCoupons;
    console.log("Lets Delete",deleteCoupons);
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(couponList())
        } else {
        history.push('/login')
        }
        if(success){
            history.push(`/admin/coupon/${success.coupon._id}/edit`);
            dispatch({type: COUPON_CREATE_RESET})
        }
        console.log(deleteSuccess);
    }, [dispatch, history, userInfo,success,deleteSuccess])

    const createCouponHandler = () =>{
        dispatch(addCoupon());
    }
    const deleteHandler = (id) =>{
        dispatch(deleteCoupon(id));
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                <h1>Coupons</h1>
                </Col>
                <Col className='text-right'>
                <Button className='my-3' onClick={createCouponHandler}>
                    <i className='fas fa-plus'></i> Create Coupon
                </Button>
                </Col>
            </Row>
            {couponLoading && <Loader />}
            {couponError && <Message variant='danger'>{couponError}</Message>}

            {deleteLoading && <Loader />}
            {deleteError && <Message variant='danger'>{deleteError}</Message>}
            {loading?(
                <Loader />
            ):error ?(
                <Message variant='danger'>{error}</Message>
            ): (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>COUPON CODE</th>
                                <th>DISCOUNT</th>
                                <th>USED COUNT</th>
                                <th>VALID</th>
                                <th>LIMIT</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log(list?.couponList)}
                            {list?.couponList.map((item) =>(
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.couponCode}</td>
                                    <td>{item.discount}</td>
                                    <td>{item.couponUsed}</td>
                                    <td>{item.valid? 'YES':'NO'}</td>
                                    <td>{item.limit}</td>
                                    <td>
                                        <LinkContainer to={`/admin/coupon/${item._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(item._id)}
                                            >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )
            }


        </>
    )
}

export default CouponListScreen
