export interface IIngredient extends Document {
  name: string;
  type: string;
  description: string;
  inStock: boolean;
}
