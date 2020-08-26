let express = require('express');
let app = express();
app.use(express.json());

let books = [
    { isbn: 123, title: "Math", publisher: "pub1" },
    { isbn: 321, title: "Science", publisher: "pub2" },
    { isbn: 231, title: "Database", publisher: "pub3" },
    { isbn: 134, title: "Cs", publisher: "pub4" },
    { isbn: 158, title: "IS", publisher: "pub5" }
];


app.get('/', function(req, res) {
    res.send('hello world');
})

const booksURL = "/Books";

app.get(booksURL, function(req, res) {
    res.json(books);
})


app.post(booksURL, function(req, res) {

    const book = {
        isbn: req.body.isbn,
        title: req.body.title,
        publisher: req.body.publisher
    }
    books.push(book);
    res.send(books);
})

app.get(booksURL, function(req, res) {
    let isbns = parseInt(req.params.isbn);
    const book = books.find(p => p.isbn = isbns);
    res.send('hello books ' + book.title);
})

app.delete(booksURL + '/:isbn', function(req, res) {
    let isbns = parseInt(req.params.isbn);
    const book = books.find(p => p.isbn = isbns);
    const index = books.indexOf(book)
    books.splice(index, 1)
    res.json(books);
})

app.put(productbaseurl + '/:id', function(req, res) {
    let isbns = parseInt(req.params.isbn);
    const book = books.find(p => p.isbn = isbns);
    book.title = req.body.title;
    book.publisher = req.body.publisher;
    res.json(book);
})
app.listen(9000);