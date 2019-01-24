const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  database: 'magicshoes',
  host: '172.31.22.246',
  port: 5432,
});

const getShoeInfo = (prodSku, cb) => {
  const query = `SELECT * FROM shoes WHERE product_sku = ${prodSku}`;
  client.query(query, cb);
};

const getRelById = (prodLine, prodCat, prodSku, cb) => {
  const query = `SELECT * FROM (SELECT * FROM shoes TABLESAMPLE SYSTEM (0.1) ORDER BY RANDOM() LIMIT 1000) AS randomsample INNER JOIN images ON randomsample.product_sku = images.product_sku WHERE randomsample.product_line = '${prodLine}' OR randomsample.product_cat = ${prodCat} AND randomsample.product_sku != ${prodSku} LIMIT 12`;
  client.query(query, cb);
};

module.exports.getRelById = getRelById;
module.exports.getShoeInfo = getShoeInfo;
