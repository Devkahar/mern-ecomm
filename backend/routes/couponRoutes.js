import express from 'express'
const router = express.Router();

import {
    addCoupon,
    verifyCoupon,
    couponList,
    deleteCoupon,
    updateCoupon,
    couponDetails
} from '../controllers/couponController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/addcoupon').post(protect,admin,addCoupon);
router.route('/verify').post(verifyCoupon)
router.route('/list').post(protect,admin,couponList)
router
    .route('/:id')
    .post(protect,admin,couponDetails)
    .delete(protect,admin,deleteCoupon)
    .put(protect,admin,updateCoupon)
export default router;