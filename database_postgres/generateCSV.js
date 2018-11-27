const fs = require('fs');

const shoeFile = fs.createWriteStream('./csvShoeSeed.csv');
const imageFile = fs.createWriteStream('./csvImageSeed.csv');
const prodLines = ['Mens Shoe', 'Womens Shoe', 'Mens Basketball Shoe', 'Womens Basketball Shoe'];
let i = 1;
let j = 1;
let k = 1;

const generateShoes = (num, callback) => {
  while (i < num + 1) {
    const priceFullDol = Math.floor(Math.random() * 200 + 100);
    const priceFullCent = Math.floor(Math.random() * 90) + 10;
    const priceFull = `${priceFullDol}.${priceFullCent}`;
    const priceSaleDol = Math.random() < 0.2 ? priceFullDol - Math.floor(Math.random() * 80) : null;
    const priceSale = priceSaleDol ? `${priceSaleDol}.${priceFullCent}` : null;
    const prodCat = Math.floor(Math.random() * 5);
    let prodColors = Math.floor(Math.random() * 10 - 5);
    prodColors = prodColors < 1 ? 1 : prodColors;
    const prodLine = prodLines[i % prodLines.length];
    let rvwCnt = Math.floor(Math.random() * 80 - 40);
    rvwCnt = rvwCnt < 0 ? 0 : rvwCnt;

    let shoe = `${i},${i},${priceFull},${priceSale},${prodCat},${prodColors},${prodLine},MagicShoes_${i},${rvwCnt}\n`;
    i++;
    if (!shoeFile.write(shoe)) {
      return;
    }
  }
  shoeFile.end();
  callback();
};

const generateImages = (num, callback) => {
  while (j < num + 1) {
    const randIdx = Math.floor(Math.random() * 1000) + 1;
    let image = `${j},https://s3-us-west-1.amazonaws.com/shoepicturesmock/${randIdx}.jpg,${j}\n`;
    j++;
    if (!imageFile.write(image)) {
      return;
    }
  }
  imageFile.end();
  callback();
};

const writeHeaders = () => {
  shoeFile.write('id,product_sku,price_full,price_sale,product_cat,product_colors,product_line,product_name,reviews_cnt\n');
  imageFile.write('id,image_source,product_sku\n');
};

shoeFile.on('drain', () => {
  generateShoes(10000000, () => {
    console.log('Shoes Done');
  });
});

imageFile.on('drain', () => {
  generateImages(10000000, () => {
    console.log('Images Done');
  });
});

const dummy = () => {
  console.log('working');
};

writeHeaders();
generateShoes(10000000, dummy);
generateImages(10000000, dummy);

//10000000
