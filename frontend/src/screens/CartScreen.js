import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

import GiftWrapper from '../components/GiftWrapper'
import CouponCode from '../components/CouponCode'
import { TextField } from '@material-ui/core'
import { verifyCoupon } from '../actions/couponActions'
import { COUPON_VERIFY_REST,ADD_GIFT_WRAPPER } from '../constants/couponConstants'
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()
  const [wrapPrice,setWrapPrice] = useState(0);
  const [coupon, setCoupon] = useState('');
  const [recipientName, setRecipientName] = useState('');  
  const [senderName, setSenderName] = useState('');  
  const [message, setMessage] = useState('');
  const [content,setContent] = useState(false);
  
  const [checked, setChecked] = React.useState(false);
  const [validCoupon,setValidCoupon] = useState('');
  const handleChange = (event) => {
    setChecked(event.target.checked);
    if(!checked){
      console.log("Exec");
      giftPackRejectHandler();
      setContent(false)
    }
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart
  console.log(cartItems);

  const couponVerify = useSelector((state) => state.couponVerify);
  const {loading,success,error} = couponVerify;
  console.log(couponVerify);
  const [price,setPrice] = useState(0);
  const [formalPrice,setFormalPrice] = useState(0);
  const [discount,setDiscount] = useState(0);
  const [shipping,setShipping] = useState(0);
  const [totalPrice,setTotalPrice] = useState(0);
  console.log("checked",checked);
  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])
  useEffect(()=>{
    setPrice(cartItems
      .reduce((acc, item) => acc + item.qty * item.price, 0)
      );
    setFormalPrice(cartItems
      .reduce((acc, item) => acc + item.qty * item.formalPrice, 0)
      )
    setDiscount(formalPrice-price);
    if(price >500){
      setShipping(0)
    }else{
      setShipping(50)
    }
    setTotalPrice(price+shipping);
    console.log("wrapp",wrapPrice);
  },[cartItems,price,formalPrice,totalPrice]);

  useEffect(() => {
    if(checked){
      setWrapPrice(75);
    }else{
      setWrapPrice(0);
    }
  },[checked,wrapPrice])
  useEffect(()=>{
    if(recipientName !=='' && senderName !=='' && message !==''){
      if(!content){
        setChecked(true)
        setContent(true);
      }
    }else{
      setChecked(false)
      setContent(false)
    }
  },[recipientName,senderName,message,checked])
  
  useEffect(()=>{
    if(success){
      setValidCoupon('success');
    }
    else if(error){
      setValidCoupon('failure');
    }else{
      setValidCoupon('');
    }

  },[success,error]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    if(checked){
      dispatch({ type: ADD_GIFT_WRAPPER, payload:{checked,details:{
        recipientName,
        senderName,
        message,
      }}})
    }else{
      dispatch({ type: ADD_GIFT_WRAPPER, payload:{checked}})
    }
    history.push('/login?redirect=shipping')
  }
  const couponHandler =()=>{
    dispatch(verifyCoupon(coupon))
    setCoupon('');
  }
  const giftPackHandler = ()=>{
    console.log(recipientName); 
  }
  const giftPackRejectHandler = ()=>{
    setRecipientName('');
    setSenderName('');
    setMessage('');
  }
  const removeCouponHandler = ()=>{
    
    dispatch({type: COUPON_VERIFY_REST})
  }
  return (
    <>    
    <Row className="mt-5 gy-5">
      <Col md={7}>
        <div className="box">
          <h1>Product In Your Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <div className="d-flex">
                  <div className="d-flex justify-content-start" style={{flex: "0.2"}}>
                    <Image src={item.image} alt={item.name} fluid rounded style={{
                      maxWidth: '80px'
                    }} />
                  </div>
                  <div className="d-flex flex-column justify-content-between" style={{flex: "0.8"}}>
                  
                    <div className="d-flex justify-content-between">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <div className="d-flex  justify-content-end align-items-top">
                        <Button
                          type='button'
                          variant='light'
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </div>
                      
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <Form.Control
                          style={{
                            padding: '0.75rem 0.8rem',
                            width: '70px'
                          }}
                          as='select'
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      <div className="d-flex align-items-center">
                        <p className="formalPrice">
                        <strong>MRP</strong> <span className="lineTrough">₹{item.formalPrice}</span>
                        </p>
                        <p className="price">
                          <strong>
                         ₹{item.price}
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        </div>
      </Col>
      <Col md={5}>
          {cartItems.length > 0 ? (

          <ListGroup variant='flush'>
            <CouponCode
            removeCoupon={removeCouponHandler}
            code={success?.couponDetails.couponCode}
            loading={loading}
            isValid={validCoupon}
            submitHandler={couponHandler}
            >
            <input
              type="text" 
              className="form-control" 
              placeholder="Enter Coupon/Voucher Code"
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
            />
            </CouponCode>
            <GiftWrapper
            content={content}
            submitHandler={giftPackHandler}
            checked={checked}
            handleChange={handleChange}
            rejectHandler={giftPackRejectHandler}
            >
            <p>Your personalised message will be printed on a card & sent with your gift.</p>
            <TextField 
            id="standard-basic" 
            label="Recipient Name"
            value={recipientName}
            onChange={e => setRecipientName(e.target.value)}
             />
            <TextField 
            id="standard-basic" 
            label="Sender Name" 
            value={senderName}
            onChange={e => setSenderName(e.target.value)}
            />
            <TextField 
            id="standard-basic"
             label="Message" 
             value={message}
            onChange={e => setMessage(e.target.value)}
             />
            </GiftWrapper>
            <ListGroup.Item className="box coupon">
              <h2>
                Payment Details
                {/* ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) */}
              </h2>
              <div className="flex mt-3">
                <span>MRP value</span>
                <span>
                ₹ {formalPrice}
                </span>
              </div>
              
              <div className="flex mt-3">
                <span>(-) Price OFF </span>
                <span>
                ₹ {discount}
                </span>
              </div>
              <hr/>

              <h6>Subtotal</h6>
              <div className="flex mt-3">
                <span>(+) Shipping </span>
                <span>
                ₹ {shipping}
                </span>
              </div>
              {checked && (
                <div className="flex mt-3">
                <span>(+) Gift Wrapper </span>
                <span>
                ₹ {wrapPrice}
                </span>
              </div>
              )}
              <hr/>
              <div className="flex">
                <h3 className={`secondaryHeading ${validCoupon ==='success'? 'priceCut':''}`}>Total Payable Amount</h3>
                <span className={`${validCoupon ==='success'? 'priceCut':''}`}>₹ {totalPrice+wrapPrice}</span>
              </div>
              {validCoupon==='success'?
              <>
                <hr/>
                <div className="flex">
                  <h3 className="text-success">Coupon Discount:</h3>
                  <span className="text-danger">-{success?.couponDetails.discount}% (₹ {((success?.couponDetails.discount/100)*totalPrice)})</span>
                </div>
                <div className="flex">
                  <h3 className={`secondaryHeading`}>Total Amount</h3>
                  <span className={`${validCoupon ==='success'? 'priceCut':''}`}>₹ {((1-(success?.couponDetails.discount/100))*totalPrice+wrapPrice)}</span>
                </div>
                {checked && <div className="text-danger">Note:- Coupon is applied only on Product not on gift wrapper</div>}
              </>
              :null}
            </ListGroup.Item>
            
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                style={{
                  backgroundColor: '#4fcf64',
                }}
                className="btm-fixed"
              >
                Proceed To Checkout
              </Button>
          </ListGroup>
          ):null}
        
      </Col>
    </Row>
    </>
  )
}

export default CartScreen