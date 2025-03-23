import { PATH_DB } from '../constants/pathDb.js';
import fs from 'node:fs/promises';

const categoriesToNames = async () => {
  try {
    const productData = await fs.readFile(PATH_DB, 'utf-8');
    const products = JSON.parse(productData);

    const categoriesView = products.reduce((acc, product) => {
      const { category, name } = product;

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(name);

      return acc;
    }, {});

    const result = Object.fromEntries(
      Object.entries(categoriesView).map(([category, names]) => [
        category,
        `${names.join(', ')}, <TOTAL>: ${names.length}`,
      ])
    );

    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

categoriesToNames();
