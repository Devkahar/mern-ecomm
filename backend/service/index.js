import subscribeToNewsLetter from '../config/mailchimp.js'
import Razorpay  from 'razorpay'
import Order from '../models/orderModel.js'

const newsLetter = (req,res)=>{

    const {email} = req.body;
    if(email){
      subscribeToNewsLetter(email)
      .then(result =>{
        console.log(result);
        res.status(201);
      })
      .catch(err =>{
        return res.status(400);
      })
    }else{
        // Fuck OFF
        return res.status(400).json({message: 'Enter valid Email'});
    }
}
const razorPay = async (req, res) =>{
  const key = process.env.RAZORPAY_KEY
  var razorpay = new Razorpay({
    key_id: `${process.env.RAZORPAY_KEY}`,
    key_secret: `${process.env.RAZORPAY_SECRET_KEY}`,
  })
  const _id = req.params.id;
  const order = await Order.findById(_id);
  const amount = order.totalPrice;
  const payment_capture = 100;
  const currency = 'INR';
  console.log(process.env.RAZORPAY_KEY);
  try {
    const response = await razorpay.orders.create({amount: amount*100,currency,receipt: `${order._id}`});
    res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      key,
    })
  } catch (error) {
    console.log(error);
  }  
}

export{
  newsLetter,
  razorPay,
}