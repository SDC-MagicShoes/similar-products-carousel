DROP DATABASE IF EXISTS magicshoes;
CREATE DATABASE magicshoes;
\c magicshoes;

CREATE TABLE IF NOT EXISTS shoes (
  sid integer NOT NULL,
  name varchar(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS images (
  id serial,
  url varchar(200) NOT NULL,
  relShoeId integer NOT NULL
);

COPY shoes FROM '/Users/ehong/dLee/similar-products-carousel/database_postgres/csvShoeSeed.csv' DELIMITER ',' CSV HEADER;
COPY images FROM '/Users/ehong/dLee/similar-products-carousel/database_postgres/csvImageSeed.csv' DELIMITER ',' CSV HEADER;
