import mongoose from 'mongoose'

const bannerSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    banners:[
        {img: {type:string}}
    ],
});

const Banner = mongoose.model('Banner', bannerSchema);

export default Banner;
 