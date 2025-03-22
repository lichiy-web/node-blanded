import fs from "node:fs/promises";
import { PATH_DB } from "../constants/pathDb.js";

async function getTotalPrice() {
    try {
        const productData = await fs.readFile(PATH_DB, "utf-8");
        const products = JSON.parse(productData);
        const totalPrice = products.reduce((total, product) => total + Number(product.price), 0);
        console.log(`Total price = $${totalPrice}`);

    } catch (error) {
        console.error(error);
    }
}

getTotalPrice();