import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    user:{
        
    },
    orderItems: [
        {
          name: { type: String, required: true },
          qty: { type: Number, required: true },
          image: { type: String, required: true },
          price: { type: Number, required: true },
          product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
          },
        },
      ]
}) 