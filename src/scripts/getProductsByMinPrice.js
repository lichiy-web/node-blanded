import { PATH_DB } from "../constants/pathDb.js";
import fs from "node:fs/promises";

async function getProductsByMinPrice(price) {
  try {
    const productsData = await fs.readFile(PATH_DB, "utf-8");
    const productList = JSON.parse(productsData);
    const filtredProducts = productList.filter(
      (product) => product.price >= price
    );
    console.table(filtredProducts);
  } catch (error) {
    console.error(error);
  }
}
getProductsByMinPrice(300);
