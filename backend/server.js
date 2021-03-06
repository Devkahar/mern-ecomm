import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import couponRoutes from './routes/couponRoutes.js'
import serviceRoutes from './routes/service.js'
import crypto from 'crypto'
import bodyParser from 'body-parser'
import  sendMail  from './config/mailgun.js'



const app = express()
connectDB()

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
// sendMail('kaharkrishna697@gmail.com','test','hello',(err,data)=>{
//   if(err) console.log(err);
//   if(data) console.log(data);
// })
sendMail().catch(error=> console.log(error))
app.use(express.json())
app.use(bodyParser.json())
app.use('/api',serviceRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/coupon',couponRoutes)
app.post('/verification',(req,res)=>{
  const secret = '12345678';
  console.log(JSON.stringify(req.body));
  const data = JSON.parse(JSON.stringify(req.body));
  console.log(data.account_id);
  const shasum = crypto.createHmac('sha256',secret)
  shasum.update(JSON.stringify(req.body))
  const digest = shasum.digest('hex')
  console.log(digest, req.headers['x-razorpay-signature']);
  if(digest === req.headers['x-razorpay-signature']){
    // success
  }
  res.json({status: 'ok'});
})


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)