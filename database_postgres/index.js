const { Pool, Client } = require('pg');
const pool = new Pool({
  user: 'postgres',
  database: 'magicshoes',
  host: '172.31.22.246',
  port: 5432
});

const getShoeInfo = (prodSku, cb) => {
  const query = `SELECT * FROM shoes WHERE product_sku = ${prodSku}`;
  pool.query(query, cb);
};

const getRelById = (prodLine, prodCat, prodSku, cb) => {
  const query = `SELECT * FROM shoes INNER JOIN images ON shoes.product_sku = images.product_sku WHERE shoes.product_line = '${prodLine}' OR shoes.product_cat = ${prodCat} AND shoes.product_sku != ${prodSku} LIMIT 12`;
  pool.query(query, cb);
};
// for testing getRelById
// explain analyze select * from shoes inner join images on shoes.product_sku = images.product_sku where shoes.product_line = 'Mens Shoe' or shoes.product_cat = 3 and shoes.product_sku != 100;

const getRelByName = (shoeName, cb) => {
  const subquery = `SELECT product_sku FROM shoes WHERE product_name = ${shoeName}`;
  const query = `SELECT * FROM images INNER JOIN shoes ON image.product_sku = shoes.product_sku WHERE shoes.product_sku = ${subquery}`;
  pool.query(query, cb);
};


module.exports.getRelById = getRelById;
module.exports.getRelByName = getRelByName;
module.exports.getShoeInfo = getShoeInfo
