import fs from "node:fs/promises";
import { PATH_DB } from "../constants/pathDb.js";

const modifyProduct = async () => {
  try {
    const productData = await fs.readFile(PATH_DB, "utf-8");
    const products = JSON.parse(productData);
    const modifiedProduct = products.map(
      ({ description, ...product }) => product
    );
    const newProduct = JSON.stringify(modifiedProduct, null, 2);
    await fs.writeFile(PATH_DB, newProduct);
  } catch (error) {
    console.error(error);
  }
};
modifyProduct();
