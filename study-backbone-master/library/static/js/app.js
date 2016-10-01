var app = app || {};

$(function(){

    //books数据库
    var books = [
        {title:'第一本书',author:'Qboooogle',releaseDate:'2016','keywords':'sdffd'},
        {title:'第er本书',author:'Qboooogle',releaseDate:'2016','keywords':'sdffd'},
        {title:'第san本书',author:'Qboooogle',releaseDate:'2016','keywords':'sdffd'},
        {title:'第si本书',author:'Qboooogle',releaseDate:'2016','keywords':'sdffd'}
    ];

    new app.LibraryView(books);
    //创建新的Books视图
});