let express = require('express');
let app = express();
app.use(express.json());

let products = [
    { id: 1, name: "Noodels", price: 10.5 },
    { id: 2, name: "Milk", price: 20.5 },
    { id: 3, name: "Egg", price: 1.5 },
    { id: 4, name: "Rice", price: 10.5 },
    { id: 5, name: "Pepsi", price: 5.0 },
];

app.get('/', function(req, res) {
    res.send('hello world');
})

const productbaseurl = "/products";
//get all products

app.get(productbaseurl, function(req, res) {
    //res.send(JSON.stringify(products)); Or
    res.json(products);
})
app.post(productbaseurl, function(req, res) {

    const product = {
        id: c++,
        name: req.body.name,
        price: req.body.price
    }
    products.push(product);
    res.send(products);
})

app.get(productbaseurl, function(req, res) {
    let ids = parseInt(req.params.id);
    const product = products.find(p => p.id === ids);
    res.send('hello products ' + product.name);
})

app.delete(productbaseurl + '/:id', function(req, res) {
    let ids = parseInt(req.params.id);
    const product = products.find(p => p.id === ids);
    const index = products.indexOf(product)
    products.splice(index, 1)
    res.json(products);
})

app.put(productbaseurl + '/:id', function(req, res) {
    let ids = parseInt(req.params.id);
    const product = products.find(p => p.id === ids);
    product.name = req.body.name;
    product.price = req.body.price
    res.json(product);
})

app.listen(3000);