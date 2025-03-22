import { PATH_DB } from "../constants/pathDb.js";
import fs from "node:fs/promises";
import { createFakeProduct } from "../utils/createFakeProduct.js";

async function generateProducts(number) {
    try {
        const productListStr = await fs.readFile(PATH_DB, 'utf-8');
        const productList = JSON.parse(productListStr);
        const newProductList = Array(number).fill(0).map(createFakeProduct);
        const mergedProductList = [...productList, ...newProductList];
        await fs.writeFile(PATH_DB, JSON.stringify(mergedProductList, null, 2));
    } catch (error) {
        console.error(error);
    }
}

generateProducts(5);