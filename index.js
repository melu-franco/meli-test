const express = require('express');
const path = require('path');

const axios = require('axios');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/items', (req,res) => {
  const search = req.query.q;
  axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${search}&limit=4`)
  .then(function(api_res) {

    const categories = api_res.data.filters[0].values[0].path_from_root.map(category => {
      return category.name;
    });
    const items = api_res.data.results.map((item) => {
    return {
      id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: Math.floor(item.price),
          decimals: Math.floor((item.price - Math.floor(item.price)) * 100)
        },
        address: item.address.city_name, 
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      }
    });
    const response = {
      author: {
        name: 'Melina',
        lastname: 'Franco',
      },
      categories: categories, 
      items: items,
    }
    res.json(response)
  })
  .catch(function(error) {
    console.log(error);
  });
});

// An api endpoint that returns selected product info
app.get('/api/items/:id', (req, res) => {
  const item_id = req.params.id;

  axios.all([
    axios.get(`https://api.mercadolibre.com/items/${item_id}`),
    axios.get(`https://api.mercadolibre.com/items/${item_id}/description`)
  ])
  .then(responseArr => {

    const item = responseArr[0].data;
    const description = responseArr[1].data.plain_text;

    const response = {
      author: {
        name: 'Melina',
        lastname: 'Franco',
      },
      item: {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: Math.floor(item.price),
          decimals: Math.floor((item.price - Math.floor(item.price)) * 100)
        },
        picture: item.pictures[0].url,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity,
        description: description
      }
    }
    res.json(response)
  })
  .catch(function(error) {
    console.log(error);
  });

});

//Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);