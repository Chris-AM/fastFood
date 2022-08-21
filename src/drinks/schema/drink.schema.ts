import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document} from "mongoose";

export type DrinksDocument = Drinks & Document;

@Schema({ timestamps: true })
export class Drinks {
    @Prop({ required: true, unique: true })
    name: string;
    @Prop({ required: true })
    price: number;
    @Prop({ required: true })
    inStock: boolean;
    @Prop({ default: null })
    photo: string;
}

export const DrinksSchema = SchemaFactory.createForClass(Drinks);

DrinksSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});