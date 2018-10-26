const mysql = require('mysql');


class Shoe {
  constructor() {
    this.connection = mysql.createConnection({
      user: 'root',
      database: 'airjordans',
    });
  }

  getOne(opts, cb) {
    this.connection.query('SELECT * FROM shoes WHERE product_sku = ? LIMIT 1', opts, cb);
  }

  getTwelveSimilarWithImages(opts, cb) {
    this.connection.query('SELECT * FROM shoes INNER JOIN images ON shoes.product_sku = images.product_sku WHERE shoes.product_line = ? OR shoes.product_cat = ? AND shoes.product_sku != ? LIMIT 12', opts, cb);
  }
}


module.exports = new Shoe();
