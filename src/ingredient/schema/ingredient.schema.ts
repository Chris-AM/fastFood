import * as mongoose from 'mongoose';

export const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  description: { type: String, required: false },
  inStock: {type: Boolean, required: true},
  image: {type: String, required: true}
}, {
  timestamps: true
},);
IngredientSchema.index({name: 1}, {unique: true});
IngredientSchema.method('toJSON', function(){
  const { __v, ...object } = this.toObject();
  return object;
});
