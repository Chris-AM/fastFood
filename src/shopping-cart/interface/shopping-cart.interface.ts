export interface IShoppingCart extends Document {
  menu: string[];
  product: string[];
  user: string[];
  total: number;
}
