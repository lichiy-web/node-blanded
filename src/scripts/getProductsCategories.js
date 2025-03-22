import { PATH_DB } from "../constants/pathDb.js";
import fs from "fs/promises";

async function getProductsCategories() {
  try {
    const productsData = await fs.readFile(PATH_DB, "utf-8");
    const products = JSON.parse(productsData);
    const productsCategories = products.map(({ category }) => category);
    const filtredCategory = productsCategories.filter(
      (category, index, array) => array.indexOf(category) === index
    );
    console.log(filtredCategory);
  } catch (error) {
    console.error(error);
  }
}

getProductsCategories();
