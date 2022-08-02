import * as mongoose from 'mongoose';

export const MenuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    photo: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, 
      ref: 'products' }],
  },{
    timestamps: true,
  },);
  MenuSchema.index({name: 1}, {unique: true})
  MenuSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
  })
