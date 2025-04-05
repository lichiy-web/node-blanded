import { ProductCollection } from '../db/models/Product.js';

export const getAllProducts = () => ProductCollection.find();
