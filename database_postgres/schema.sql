DROP DATABASE IF EXISTS magicshoes;
CREATE DATABASE magicshoes;
\c magicshoes;

CREATE TABLE IF NOT EXISTS shoes (
  id serial,
  product_sku integer,
  price_full varchar(50),
  price_sale varchar(50),
  product_cat integer,
  product_colors integer,
  product_line varchar(40),
  product_name varchar(30) NOT NULL,
  reviews_cnt integer
);

CREATE TABLE IF NOT EXISTS images (
  id serial,
  image_source varchar(200) NOT NULL,
  product_sku integer NOT NULL
);

\COPY shoes FROM './csvShoeSeed.csv' DELIMITER ',' CSV HEADER;
\COPY images FROM './csvImageSeed.csv' DELIMITER ',' CSV HEADER;
