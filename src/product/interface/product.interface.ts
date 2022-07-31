export interface IProduct extends Document{
  name: string;
  price: number;
  description: string;
  photo: string;
  ingredients: string[];
}
