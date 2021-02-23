import Coupon from '../models/CouponModel';

// @desc    add Coupon
// @route   POST /api/coupon/addcoupon
// @access  Private
const addCoupon = async(req,res)=>{
    const {
        _id,
        couponCode,
        discount,
        limit,
        valid,
    } = req.body;

    try {
        const createCoupon = new Coupon({
            user: _id,
            couponCode,
            discount,
            limit,
            valid,
        })
        const coupon = await createCoupon.save();
        if(coupon) return res.status(201).json({message:'coupon created',coupon});
    } catch (error) {
        if(error) return res.status(500).json({message: error});
    }
}
// @desc    verify Coupon
// @route   POST /api/coupon/verify
// @access  Public
const verifyCoupon = (req,res) =>{
    const {
        couponCode
    }= req.body;

    Coupon.findOne({couponCode}).exec((error,coupon) =>{
        if(error) return res.status(400).json({message: 'Invalid Coupon'});
        if(coupon){
            if(coupon.valid){
                if(coupon.couponUsed <coupon.couponLimit){
                    const {
                        _id,
                        couponCode,
                        discount,
                    } = coupon;
                    return res.status(200).json({message:'success',couponDetails:{
                        _id,
                        couponCode,
                        discount,
                    }});
                }else{
                    return res.status(400).json({message: 'Coupon Expired'});
                }
            }else{
                return res.status(400).json({message: 'Coupon Expired'});
            }
            
        }
    })
}

// @desc    Coupon List
// @route   GET /api/coupon/list
// @access  Private
const couponList = (req,res) =>{
    Coupon.find({}).populate('user','id name').exec((error,couponList) =>{
        if(error) return res.status(500);
        if(couponList) return res.status(200).json({couponList})
    })
}

// @desc    delete Coupon
// @route   DELETE /api/coupon/:id
// @access  Private
const deleteCoupon = async(req,res) =>{
    const _id = req.params.id;
    try {
        const result = await Coupon.deleteOne({_id})
        if(result) res.status(204).json({message: "Coupon Deleted SuccessFully"})
    } catch (error) {
        return res.status(500).json({message: error});
    }
}
// @desc    add Coupon
// @route   PUT /api/coupon/:id
// @access  Private
const updateCoupon = async (req,res) =>{
    const _id = req.params.id;
    const {
        couponCode,
        discount,
        limit,
        valid
    } = req.body;
    try {
        const result = await Coupon.findById({_id});
        if(result){
           result.couponCode = couponCode;
           result.discount = discount;
           result.limit = limit;
           result.valid = valid;
           const updateCoupon = await result.save();
           res.status(200).json({updateCoupon});
        }else{
            res.status(404)
        }
        
    } catch (error) {
        res.status(404)
    }
}
export{
    addCoupon,
    verifyCoupon,
    couponList,
    deleteCoupon,
    updateCoupon
}