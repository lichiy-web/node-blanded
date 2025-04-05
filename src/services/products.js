import { ProductCollection } from '../db/models/Product.js';

export const getAllProducts = () => ProductCollection.find();

export const getProductById = (id) => ProductCollection.findById(id);

export const addNewProduct = (productData) =>
  ProductCollection.create(productData);

export const deleteProductById = (id) =>
  ProductCollection.findByIdAndDelete(id);

export const updateProduct = (id, productData) =>
  ProductCollection.findByIdAndUpdate(id, productData, { new: true });
