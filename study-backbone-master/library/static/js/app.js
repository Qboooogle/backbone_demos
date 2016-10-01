var app = app || {};

$(function(){

    //books数据库
    var books = [
        {title:'第一本书',author:'Qboooogle',releaseDate:'2016','keywords':'sdffd'},
        {title:'第二本书',author:'Qboooogle',releaseDate:'2016','keywords':'sdffd'},
        {title:'第三本书',author:'Qboooogle',releaseDate:'2016','keywords':'sdffd'},
        {title:'第四本书',author:'Qboooogle',releaseDate:'2016','keywords':'sdffd'}
    ];

    new app.LibraryView(books);
    //创建新的Books视图
});