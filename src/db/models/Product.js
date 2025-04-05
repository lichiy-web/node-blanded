import { model, Schema } from 'mongoose';

export const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['books', 'electronics', 'clothing', 'other'],
      required: true,
      default: 'other',
    },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ProductCollection = model('product', productSchema);
