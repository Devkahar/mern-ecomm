import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import Coupon from '../models/CouponModel.js'
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    _id,
    coupon,
    giftWrapper,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
  } = req.body;

  console.log("order items",orderItems);
  let giftWrap;
  let wrapPrice =0;
  giftWrap = {
    isWrap: giftWrapper.giftCard.checked,
  }
  if(giftWrapper.giftCard.checked){
    giftWrap = {
      ...giftWrap,
      ...giftWrapper.giftCard.details,
    }
    wrapPrice =75;
  }

  console.log(giftWrap);
  let _coupon;
  let couponDiscount = 0;
  console.log(coupon.success.couponDetails._id);
  if(coupon){
    try {
      _coupon = {
        isCoupon: true,
        couponID: coupon.success.couponDetails._id,
      }
      const coupond = await Coupon.findById({_id: _coupon.couponID});
      if(coupond){
        couponDiscount = coupond.discount;
      }
      
    } catch (error) {
      throw new Error('No Coupon Exist');
    }
  }else{
    _coupon = {
      isCoupon: false,
    }
  }
  const createOrder = async (giftWrap,coupon,orderItems,user,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice)=>{
    const order = new Order({
      giftWrap,
      coupon,
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save();
    return res.status(201).json(createdOrder)
  }
  let orderItemsv = orderItems;
  orderItems.map(async (e,index) =>{
    const product = await Product.findById(e.product);
    orderItemsv[index].price = product.price;
  })
  let totalPricev = orderItemsv.reduce((acc, item) => acc + item.price * item.qty, 0) * ((100-couponDiscount)/100)+wrapPrice;
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    Order.findOne({user: _id,isPaid: false}).exec( (error,o)=>{
      console.log('re');
      if(error){
        console.log('err');
        return createOrder(giftWrap,_coupon,orderItemsv,req.user._id,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPricev);
      }
      if (o){
        console.log('su');
        Order.findOneAndUpdate({_id: o._id},{
          giftWrap,
          coupon: _coupon,
          orderItems: orderItemsv,
          user: req.user._id,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice: totalPricev,
        },
        {
          new: true,
          upsert: true 
        }
        ).exec((error,order)=>{
          if(error) return res.status(400)
          if(order) return res.status(201).json(order);
        })
      }else{
        createOrder(giftWrap,_coupon,orderItemsv,req.user._id,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPricev);
      }
    })
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      payment_id: req.body.payment_id,
      order_id: req.body.order_id,
      update_time: Date.now(),
      email_address: req.body.email_address,
    }
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
}