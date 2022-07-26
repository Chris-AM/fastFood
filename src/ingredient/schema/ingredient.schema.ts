import * as mongoose from 'mongoose';

export const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  description: { type: String, required: false },
  inStock: {type: Boolean, required: true}
}, {
  timestamps: true
},);
IngredientSchema.index({name: 1}, {unique: true});
