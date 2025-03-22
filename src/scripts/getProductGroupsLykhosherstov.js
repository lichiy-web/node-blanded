import { PATH_DB } from '../constants/pathDb.js';
import fs from 'node:fs/promises';

const getProductGroups = async () => {
  try {
    const productData = await fs.readFile(PATH_DB, 'utf-8');
    const products = JSON.parse(productData);

    const dateMark1 = new Date();
    const productGroups = products.reduce(
      (groups, { category, name }) => ({
        ...groups,
        [category]: groups[category] ? [...groups[category], name] : [name],
      }),
      {}
    );
    const productGroupsDuration = new Date() - dateMark1;

    const dateMark2 = new Date();
    const rawProdGrps = products.reduce(
      (groups, { category, name }) => ({
        ...groups,
        [category]: groups[category]
          ? `${groups[category]},"${name}"`
          : `"${name}"`,
      }),
      {}
    );
    const prodGrps = Object.fromEntries(
      Object.entries(rawProdGrps).map(([group, prods]) =>
        JSON.parse(`["${group}", [${prods}]]`)
      )
    );
    const prodGrpsDuration = new Date() - dateMark2;

    // console.log('productGroups = ', productGroups);
    // console.log('prodGrps = ', prodGrps);
    console.log('productGroupsDuration = ', productGroupsDuration);
    console.log('prodGrpsDuration = ', prodGrpsDuration);
  } catch (error) {
    console.error(error);
  }
};

getProductGroups();
