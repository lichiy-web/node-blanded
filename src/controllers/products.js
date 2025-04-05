import createHttpError from 'http-errors';
import {
  getAllProducts,
  getProductById,
  addNewProduct,
  deleteProductById,
  updateProduct,
} from '../services/products.js';

export const getAllProductsController = async (req, res) => {
  const products = await getAllProducts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductByIdController = async (req, res) => {
  const { productId } = req.params;
  const productById = await getProductById(productId);
  if (!productById) {
    throw createHttpError(404, 'Product not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: productById,
  });
};

export const addNewProductController = async (req, res) => {
  const product = req.body;
  const newProduct = await addNewProduct(product);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: newProduct,
  });
};

export const deleteProductByIdController = async (req, res) => {
  const { productId } = req.params;
  const deleteProduct = await deleteProductById(productId);
  if (!deleteProduct) {
    throw createHttpError(404, 'Product not found');
  }
  res.status(204).end();
};

export const updateProductController = async (req, res) => {
  const { productId } = req.params;
  const product = req.body;
  const updatedProduct = await updateProduct(productId, product);
  if (!updatedProduct) {
    throw createHttpError(404, 'Product not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a product!',
    data: updatedProduct,
  });
};
