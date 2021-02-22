import express from 'express'
import {newsLetter,razorPay} from '../service/index.js'
const router = express.Router();

router.post('/subscribe',newsLetter)
router.get('/config/razorpay/:id',razorPay)
export default router;