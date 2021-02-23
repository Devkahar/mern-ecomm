import express from 'express'
const router = express.Router();

import {
    addCoupon,
    verifyCoupon,
    couponList,
    deleteCoupon,
    updateCoupon
} from '../controllers/couponController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

router.route.post('/addcoupon',protect,admin,addCoupon);
router.route.post('/verify',verifyCoupon)
router.route.get('/list',protect,admin,couponList)
router
    .route('/:id')
    .delete(protect,admin,deleteCoupon)
    .put(protect,admin,updateCoupon)
