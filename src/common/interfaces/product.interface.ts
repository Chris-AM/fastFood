import { IIngredient } from "./ingredient.interface";

export interface IProduct extends Document{
  name: string;
  price: number;
  description: string;
  quantity: number;
  photo: string;
  ingredients: IIngredient[];
}
