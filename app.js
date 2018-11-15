const express = require('express');
const path = require('path');
const compress = require('compression');
const db = require('./database/model.js');

const app = express();

app.use(compress());
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

app.get('/:product_sku/similar', (req, res) => {
  db.getOne(req.params.product_sku, (err1, data1) => {
    if (err1) {
      res.status(500).send(err1.message);
    } else {
      const opts = [data1[0].product_line, data1[0].product_cat, data1[0].product_sku];
      db.getImagesOfTwelveSimilar(opts, (err2, data2) => {
        if (err2) {
          res.status(500).send(err2.message);
        } else {
          res.send(data2);
        }
      });
    }
  });
});

app.post('/:product_sku/similar', (req, res) => {
  db.addOne([req.params.product_sku, req.body.image_view, req.body.image_source], (err) => {
    if (err) {
      res.status(500).send(err.message);
    }
    res.send();
  });
});

app.put('/:product_sku/similar', (req, res) => {
  db.modifyOne([req.params.product_sku, req.body.image_view, req.body.image_source, req.params.product_sku], (err) => {
    if (err) {
      res.status(500).send(err.message);
    }
    res.status(201).send();
  });
});

app.delete('/:product_sku/similar', (req, res) => {
  db.deleteOne(req.params.product_sku, (err) => {
    if (err) {
      res.status(500).send(err.message);
    }
    res.status(200).send();
  });
});

module.exports = app;
