import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    photo: { type: String, required: true },
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ingredients' }],
  },{
    timestamps: true,
  },);
  ProductSchema.index({name: 1}, {unique: true})
