import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

import GiftWrapper from '../components/GiftWrapper'
import CouponCode from '../components/CouponCode'
import { TextField } from '@material-ui/core'
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState('');  
  const [recipientName, setRecipientName] = useState('');  
  const [senderName, setSenderName] = useState('');  
  const [message, setMessage] = useState('');
  const [content,setContent] = useState(false);
  const cart = useSelector((state) => state.cart);
  const [checked, setChecked] = React.useState(false);
  const [validCoupon,setValidCoupon] = useState('');
  const handleChange = (event) => {
    setChecked(event.target.checked);
    if(!checked){
      giftPackRejectHandler();
      setContent(false)
    }
  };
  const { cartItems } = cart
  console.log(cartItems);
  const [price,setPrice] = useState(0);
  const [formalPrice,setFormalPrice] = useState(0);
  const [discount,setDiscount] = useState(0);
  const [shipping,setShipping] = useState(0);
  const [totalPrice,setTotalPrice] = useState(0);
  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])
  useEffect(()=>{
    setPrice(cartItems
      .reduce((acc, item) => acc + item.qty * item.price, 0)
      .toFixed(2));
    setFormalPrice(cartItems
      .reduce((acc, item) => acc + item.qty * item.formalPrice, 0)
      .toFixed(2))
    setDiscount(formalPrice-price);
    if(price >500){
      setShipping(0)
    }else{
      setShipping(50)
    }
    setTotalPrice(price+shipping);
  },[cartItems,price,formalPrice]);

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
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }
  const couponHandler =()=>{
    console.log(coupon);
    setValidCoupon('success');
  }
  const giftPackHandler = ()=>{
    console.log(recipientName); 
  }
  const giftPackRejectHandler = ()=>{
    setRecipientName('');
    setSenderName('');
    setMessage('');
  }
  return (
    <>    
    <Row className="mt-5 gy-5">
      <Col md={7} className="box">
        <h1>Product IN Your Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush' className="bo">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>Rs.{item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      style={{
                        padding: '0.75rem 0.8rem'
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
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={5}>
        
          <ListGroup variant='flush'>
            <CouponCode
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
              <hr/>
              <div className="flex">
              <h3 className="secondaryHeading">Total Payable Amount</h3>
              <span>₹ {totalPrice.toString().split('.')[0]}</span>
              </div>
            </ListGroup.Item>
            
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                style={{
                  backgroundColor: '#4fcf64',
                }}
              >
                Proceed To Checkout
              </Button>
          </ListGroup>
        
      </Col>
    </Row>
    </>
  )
}

export default CartScreen