const fs = require('fs');

const file = fs.createWriteStream('./jsonseed.json');
let i = 1;

const getRandIdx = (num) => {
  const result = [];
  for (let i = 0; i < num; i++) {
    const randIdx = Math.floor(Math.random() * 1000) + 1;
    result.push(randIdx);
  }
  return result;
};

const generate = (num, callback) => {
  while (i < 10000000) {
    const randIdx = getRandIdx(4);

    let shoe = {
      shoeId: i,
      name: `MagicShoes_${i}`,
      relImageUrls: [
        `https://s3-us-west-1.amazonaws.com/shoepicturesmock/${randIdx[0]}`,
        `https://s3-us-west-1.amazonaws.com/shoepicturesmock/${randIdx[1]}`,
        `https://s3-us-west-1.amazonaws.com/shoepicturesmock/${randIdx[2]}`,
        `https://s3-us-west-1.amazonaws.com/shoepicturesmock/${randIdx[3]}`
      ]
    };
    shoe = JSON.stringify(shoe);
    i++;
    if (!file.write(shoe)) {
      return;
    }
  }
  file.end();
  callback();
};

file.on('drain', () => {
  generate(10000000, () => {
    console.log('Done');
  });
});

generate(10000000);



//10000000
