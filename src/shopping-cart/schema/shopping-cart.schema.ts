import * as mongoose from 'mongoose';

export const ShoppingCartSchema = new mongoose.Schema({
  menus: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'menus',
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
    },
  ],
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
  total: {
    type: String,
    
  },
});
