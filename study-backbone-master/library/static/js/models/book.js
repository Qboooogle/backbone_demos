var app = app || {};

app.BookModel= Backbone.Model.extend({
   defaults:{
       coverImage:'img/book.jpg',
       title:'未命名',
       author:'佚名',
       releaseDate:'未知',
       keywords:'未知'
   }
});