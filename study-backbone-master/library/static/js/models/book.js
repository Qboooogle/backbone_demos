//模型用以描述数据组成，与服务器端同步（获取数据，更新数据，
//删除数据），同样还可以使用浏览器端的localStorage将数据储存在前端。
var app = app || {};

app.BookModel= Backbone.Model.extend({
   defaults:{
       coverImage:'img/book.jpg',
       title:'未命名',
       author:'佚名',
       releaseDate:'未知',
       keywords:'未知'
   }
   //还可以添加校验
   //validate：function(attrs) {
   //  if (attrs.name.length == 0) {
   //      return "name can not be empty!"
   //     }
   //}
});