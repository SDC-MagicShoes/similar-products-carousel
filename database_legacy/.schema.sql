CREATE DATABASE IF NOT EXISTS airjordans;
USE airjordans;

DROP TABLE IF EXISTS shoes;
DROP TABLE IF EXISTS images;

CREATE TABLE shoes (
  id SERIAL,
  product_sku VARCHAR(20),
  price_full SMALLINT UNSIGNED,
  price_sale SMALLINT UNSIGNED,
  product_cat SMALLINT UNSIGNED,
  product_colors SMALLINT UNSIGNED,
  product_line VARCHAR(40),
  product_name VARCHAR(60),
  reviews_avg DECIMAL(3,2) UNSIGNED,
  reviews_cnt SMALLINT UNSIGNED
);

CREATE TABLE images (
  id SERIAL,
  product_sku VARCHAR(20),
  image_view VARCHAR(20),
  image_source VARCHAR(150)
);

