const promise = require('bluebird');
const mysql = require('mysql');
const fs = promise.promisifyAll(require('fs'));

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'warpv',
  password: 'justdoit',
  database: 'airjordans',
  multipleStatements: true,
});
promise.promisifyAll(connection);

const prodSkus = ['310805-408', '310806-408', '310806-002', '305381-113', '852542-306', '554724-062', '554724-113', '554724-071', '554724-610', '554724-050', '554724-109', 'AR4491-001', 'AR4491-700', 'AV3922-601', 'AV3922-348', 'AV3922-001', 'AT3146-001', 'AV1200-600', 'AV1200-007', 'AV1200-008', 'AV1200-401', 'AV1200-100', 'AV1200-200', 'AV1200-001', '315371-006', '315371-300', '310805-160', '136027-148', 'AV7008-700', 'AV7007-001', 'AR5599-006', 'AT4040-601', '820273-300', '820273-400', '820273-600', '820276-006', '554725-065', '640734-065', '640734-071', 'AR6351-113', 'AR6352-113', 'AT8012-601', 'AT8011-407', 'BV8017-445', '384665-104', '305368-113', '440888-148', '884129-035', '414575-035', '151186-301', '850000-301', 'AA2494-801', 'AA2494-401', 'AA2494-701', '555088-801', '555088-401', 'AQ7924-001', 'AQ7924-305', 'AQ7924-107', 'AQ7924-601', 'AQ7924-100', 'AQ9119-300', 'AQ9119-001', '555112-001', '640735-065', '640735-071', 'AT4612-500', 'AT4613-500', 'BV8018-445', 'AR4430-016', 'AR4430-105', 'AR4430-003', 'AR4430-200', 'AR4430-023', 'AR1000-001', 'AR1000-006', 'AR1000-003', 'AR1000-023', '580603-603', '580603-300', '580603-401', '580603-001', 'AO9744-600', '384666-104', '384667-104', 'AJ7984-002', 'AJ7984-600', 'AJ7984-001', 'AO2649-001', 'AO2649-301', 'AO2649-023', 'AO2649-007', 'AO2649-002', 'AJ7990-003', 'AJ7990-001', 'AJ7990-301', 'AJ7990-006', 'AA2517-600', 'AA2517-005', 'AA2517-002', 'AA2517-062', 'AA2517-023', 'AA2517-004', '684915-106', 'AH8109-003', 'AH8109-600', 'AH8109-100', 'AH8109-002', 'AO1561-003', 'AO1561-117', 'AO1561-010', 'AO1561-011', 'AO1561-107', 'AO1560-010', 'AO1560-117', 'AA1253-105', 'AA1253-400', 'AQ9084-063', 'AQ9084-006', 'AQ9084-100', 'AQ9084-300', 'AQ9084-010'];
const prodLines = ['Men\'s Shoe', 'Women\'s Shoe', 'Men\'s Basketball Shoe', 'Women\'s Basketball Shoe'];
const imgSrcs = ['https://s3.amazonaws.com/warp-v/images/136027_148.jpeg', 'https://s3.amazonaws.com/warp-v/images/305381_113.jpeg', 'https://s3.amazonaws.com/warp-v/images/554724_050.jpeg', 'https://s3.amazonaws.com/warp-v/images/555088_401.jpeg', 'https://s3.amazonaws.com/warp-v/images/AA1253_105.jpeg', 'https://s3.amazonaws.com/warp-v/images/AA1272_014.jpeg', 'https://s3.amazonaws.com/warp-v/images/AH6789_602.jpeg', 'https://s3.amazonaws.com/warp-v/images/AH6789_801.jpeg', 'https://s3.amazonaws.com/warp-v/images/AJ1936_001.jpeg', 'https://s3.amazonaws.com/warp-v/images/AJ2018_700.jpeg', 'https://s3.amazonaws.com/warp-v/images/AO1755_005.jpeg', 'https://s3.amazonaws.com/warp-v/images/AO2649_301.jpeg', 'https://s3.amazonaws.com/warp-v/images/AO8979_600.jpeg', 'https://s3.amazonaws.com/warp-v/images/AO9378_002.jpeg', 'https://s3.amazonaws.com/warp-v/images/AQ0070_014.jpeg', 'https://s3.amazonaws.com/warp-v/images/AQ1087_102.jpeg', 'https://s3.amazonaws.com/warp-v/images/AQ9084_006.jpeg', 'https://s3.amazonaws.com/warp-v/images/AQ9119_300.jpeg', 'https://s3.amazonaws.com/warp-v/images/AR0043_600.jpeg', 'https://s3.amazonaws.com/warp-v/images/AR1000_023.jpeg', 'https://s3.amazonaws.com/warp-v/images/AV2296_402.jpeg', 'https://s3.amazonaws.com/warp-v/images/AV3922_601.jpeg', 'https://s3.amazonaws.com/warp-v/images/AV7014_002.jpeg', 'https://s3.amazonaws.com/warp-v/images/BQ7930_400.jpeg'];

const readSchema = fs.readFileAsync('database/.schema.sql', 'utf8');

const initSchema = (schema) => { connection.queryAsync(schema); };

const seedTables = () => {
  const seeds = [];
  prodSkus.forEach((prodSku, i) => {
    const priceFull = Math.random() * 200 + 100;
    const priceSale = Math.random() > 0.5 ? priceFull - Math.random() * 80 : null;
    const prodCat = Math.floor(Math.random() * 5);
    let prodCols = Math.floor(Math.random() * 10 - 5);
    prodCols = prodCols < 1 ? 1 : prodCols;
    const prodLine = prodLines[i % prodLines.length];
    const prodName = 'Best Shoe Ever';
    const revsAvg = Math.random() * 3 + 2;
    let revsCnt = Math.floor(Math.random() * 80 - 40);
    revsCnt = revsCnt < 0 ? 0 : revsCnt;

    seeds.push(connection.queryAsync(
      'INSERT INTO shoes (product_sku, price_full, price_sale, product_cat, product_colors, product_line, product_name, reviews_avg, reviews_cnt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [prodSku, priceFull, priceSale, prodCat, prodCols, prodLine, prodName, revsAvg, revsCnt],
    ));

    const imgSrc = imgSrcs[i % imgSrcs.length];
    seeds.push(connection.queryAsync(
      'INSERT INTO images (product_sku, image_view, image_source) VALUES (?, ?, ?)',
      [prodSku, 'profile_left', imgSrc],
    ));
  });
  promise.all(seeds);
};

promise.resolve(readSchema)
  .then(initSchema)
  .then(seedTables)
  .then(() => {
    connection.end();
  });
