//集合是模型的列表，虽然并非必须，但一般会在定义时指定模型的类型。
//集合提供丰富的API，用以对集合进行增删改，过滤等操作。
var app = app || {};

app.Library = Backbone.Collection.extend({
    model:app.BookModel,
    url:'/api/books'
});