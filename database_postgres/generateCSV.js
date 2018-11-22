const fs = require('fs');

const shoeFile = fs.createWriteStream('./csvShoeSeed.csv');
const imageFile = fs.createWriteStream('./csvImageSeed.csv');
let i = 1;
let j = 1;
let k = 1;

const generateShoes = (num, callback) => {
  while (i < num + 1) {
    let shoe = `${i},MagicShoes_${i}\n`;
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
    let image = `${j},https://s3-us-west-1.amazonaws.com/shoepicturesmock/${randIdx},${k}\n`;

    if (j % 4 === 0) {
      k++;
    }
    j++;
    if (!imageFile.write(image)) {
      return;
    }
  }
  imageFile.end();
  callback();
};

const writeHeaders = () => {
  shoeFile.write('sid,name\n');
  imageFile.write('id,url,relShoeId\n');
};

shoeFile.on('drain', () => {
  generateShoes(10000000, () => {
    console.log('Shoes Done');
  });
});

imageFile.on('drain', () => {
  generateImages(40000000, () => {
    console.log('Images Done');
  });
});

const dummy = () => {
  console.log('working');
};

writeHeaders();
generateShoes(10000000, dummy);
generateImages(40000000, dummy);

//10000000
