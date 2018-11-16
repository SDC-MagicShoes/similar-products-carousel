const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'warpv',
  password: 'justdoit',
  port: 8081,
  database: 'airjordans',
});

connection.getOne = (opts, cb) => {
  connection.query('SELECT * FROM shoes WHERE product_sku = ? LIMIT 1', opts, cb);
};

connection.getAll = (cb) => {
  connection.query('SELECT * FROM shoes', cb);
};

connection.getImagesOfTwelveSimilar = (opts, cb) => {
  const q = 'SELECT * FROM shoes INNER JOIN images ON shoes.product_sku = images.product_sku WHERE shoes.product_line = ? OR shoes.product_cat = ? AND shoes.product_sku != ? ORDER BY RAND() LIMIT 12';
  connection.query(q, opts, cb);
};

connection.addOne = (opts, cb) => {
  connection.query('INSERT INTO images (product_sku, image_view, image_source) VALUES (?, ?, ?)', opts, cb);
};

connection.modifyOne = (opts, cb) => {
  connection.query('UPDATE images SET product_sku = ?, image_view = ?, image_source = ? WHERE product_sku = ?', opts, cb);
};

connection.deleteOne = (opts, cb) => {
  connection.query('DELETE * FROM images WHERE product_sku = ?', opts, cb);
};

module.exports = connection;
