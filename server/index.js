const express = require('express');
const compress = require('compression');
const cors = require('cors');
const db = require('../database_postgres/index.js');

const app = express();
const port = 8081;

app.use(compress());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/:product_sku/similar', (req, res) => {
  const productSku = Math.floor(Math.random() * (10000001 - 9000000)) + 9000000;
  db.getShoeInfo(productSku, (err, shoeInfo) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      db.getRelById(shoeInfo.rows[0].product_line, shoeInfo.rows[0].product_cat, shoeInfo.rows[0].product_sku, (err2, results) => {
        if (err2) {
          res.status(500).send(err2);
        } else {
          res.status(200).send(results.rows);
        }
      });
    }
  });
});


// legacy GET route (for legacy DB)
// app.get('/:product_sku/similar', (req, res) => {
//   model.Shoe.getOne(req.params.product_sku, (err1, data1) => {
//     if (err1) {
//       res.status(500).send(err1.message);
//     } else {
//       const opts = [data1[0].product_line, data1[0].product_cat, data1[0].product_sku];
//       model.Shoe.getImagesOfTwelveSimilar(opts, (err2, data2) => {
//         if (err2) {
//           res.status(500).send(err2.message);
//         } else {
//           res.send(data2);
//         }
//       });
//     }
//   });
// });

// POST, PUT, DELETE routes for legacy DB
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

app.listen(port, () => {
  console.log(`>>>>>>>>> listening on port ${port}`);
});
