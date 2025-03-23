import { PATH_DB } from '../constants/pathDb.js';
import fs from 'node:fs/promises';

const getProductGroups = async () => {
  try {
    const productData = await fs.readFile(PATH_DB, 'utf-8');
    const products = JSON.parse(productData);

    const dateMark1 = new Date();
    const productGroups1 = products.reduce(
      (groups, { category, name }) => ({
        ...groups,
        [category]: groups[category]
          ? !groups[category].includes(name) && [...groups[category], name]
          : [name],
      }),
      {}
    );
    const productGroupsDuration1 = new Date() - dateMark1;

    const dateMark2 = new Date();
    const productGroups2 = products.reduce((groups, { category, name }) => {
      const group = groups[category];
      group
        ? !group.includes(name) && group.push(name)
        : (groups[category] = [name]);
      return groups;
    }, {});
    const productGroupsDuration2 = new Date() - dateMark2;

    const dateMark3 = new Date();
    const productGroups3 = products.reduce(
      (groups, { category, name }, i, { length: last }) => {
        const group = groups[category];
        !group ? (groups[category] = { [name]: null }) : (group[name] = null);

        if (i === last - 1) {
          for (let cat in groups) {
            groups[cat] = Object.keys(groups[cat]);
          }
        }

        return groups;
      },
      {}
    );
    const productGroupsDuration3 = new Date() - dateMark3;

    // console.log('productGroups1 = ', productGroups1);
    // console.log('productGroups2 = ', productGroups2);
    console.log('productGroups3 = ', productGroups3);
    console.log('productGroupsDuration1 = ', productGroupsDuration1);
    console.log('productGroupsDuration2 = ', productGroupsDuration2);
    console.log('productGroupsDuration3 = ', productGroupsDuration3);
  } catch (error) {
    console.error(error);
  }
};

getProductGroups();
