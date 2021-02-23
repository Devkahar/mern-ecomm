import mongoose from 'mongoose'

const couponSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    couponCode:{
        type: String,
        required: true,
    },
    discount:{
        type: Number,
        required: true,
    },
    limit:{
        type: Number,
        required: true,
    },
    couponUsed:{
        type: Number,
    },
    valid:{
        type: Boolean,
        required: true
    }
});

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
