var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

//连接数据库
//mongoose.connect('mongodb://localhost/test');

var Book = mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date
});

var BookModel = mongoose.model('Book', Book);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'static')));

//获取图书
app.get('/api/books', function (req, res) {
    res.send([
        {title:'第一本书',author:'Qboooogle',releaseDate:'2007','keywords':'sdffd',id:1},
        {title:'第二本书',author:'Qboooogle',releaseDate:'2007','keywords':'sdffd',id:2},
        {title:'第三本书',author:'Qboooogle',releaseDate:'2007','keywords':'sdffd',id:3},
        {title:'第四本书',author:'Qboooogle',releaseDate:'2007','keywords':'sdffd',id:4}
    ]);
  /*  BookModel.find(function (err, books) {
        if (err)
            throw  err;
        return res.send(books)
    });*/
});

app.post('/api/books', function (req, res) {
    var book = new BookModel({
        title: req.body.title,
        author: req.body.author,
        releaseDate: req.body.releaseDate
    });
    book.save(function (e) {
       if(e)
            throw e;
        return res.send(book);
    });
});

app.delete('/api/books/:id',function(req,res){
   res.json(req.params);
});

app.listen(3000);
console.log("服务器已经在 http://localhost:3000 端口运行！");