const { Pool } = require('pg');

// remember to change host for deployed instances
const pool = new Pool({
  user: 'postgres',
  database: 'magicshoes',
  host: 'localhost',
  port: '5432',
});

const getShoeInfo = (prodSku, cb) => {
  const query = `SELECT * FROM shoes WHERE product_sku = ${prodSku}`;
  pool.query(query, cb);
};

const getRelById = (prodLine, prodCat, prodSku, cb) => {
  const query = `SELECT * FROM (SELECT * FROM shoes TABLESAMPLE SYSTEM (0.1) ORDER BY RANDOM() LIMIT 1000) AS randomsample INNER JOIN images ON randomsample.product_sku = images.product_sku WHERE randomsample.product_line = '${prodLine}' OR randomsample.product_cat = ${prodCat} AND randomsample.product_sku != ${prodSku} LIMIT 12`;
  pool.query(query, cb);
};

module.exports.getRelById = getRelById;
module.exports.getShoeInfo = getShoeInfo;
