let express = require('express');
let app = express();
app.use(express.json());

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

const Product = mongoose.model("Product", productSchema);

/*let products = [
    { id: 1, name: "Noodels", price: 10.5 },
    { id: 2, name: "Milk", price: 20.5 },
    { id: 3, name: "Egg", price: 1.5 },
    { id: 4, name: "Rice", price: 10.5 },
    { id: 5, name: "Pepsi", price: 5.0 },
];

c = products.length + 1;
*/



app.get('/', function(req, res) {
    res.send('hello world');
})

const productbaseurl = "/products";
//get all products

app.get(productbaseurl, function(req, res) {
    Product.find()
        .exec()
        .then(prod => {
            res.json(prod);
        })
        .catch(err => {
            console.log(err);
        });
})
app.post(productbaseurl, function(req, res) {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {
            console.log(result);
            Product.find()
                .exec()
                .then(prod => {
                    res.json(prod);
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
})

app.get(productbaseurl + '/:id', function(req, res) {
    let ids = parseInt(req.params.id);

    Product.findOne({ _id: ids })
        .exec()
        .then(prod => {
            res.send('hello products ' + prod.name);
        })
        .catch(err => {
            console.log(err);
        });

})

app.delete(productbaseurl + '/:id', function(req, res) {
    let ids = parseInt(req.params.id);

    Product.remove({ _id: ids })
        .exec()
        .then(result => {
            console.log(result);
            Product.find()
                .exec()
                .then(prod => {
                    res.json(prod);
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });

})

app.put(productbaseurl + '/:id', function(req, res) {
    let ids = parseInt(req.params.id);

    Product.update({ _id: ids }, { price: req.body.price, name: req.body.name })
        .exec()
        .then(result => {
            console.log(result);
            Product.find()
                .exec()
                .then(prod => {
                    res.json(prod);
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        })

})

app.listen(3000);