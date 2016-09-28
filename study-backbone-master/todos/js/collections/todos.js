var app = app || {};

var TodoList = Backbone.Collection.extend({

    //模型设置为todo
    model: app.Todo,

    //使用localStorage做持久化
    localStorage: new Backbone.LocalStorage('todos-backbone'),

    //获取所有已完成的todo
    completed: function () {
        return this.filter(function (todo) {
            return todo.get('completed');
        });
    },

    //未完成的todo
    remaining: function () {
        return this.without.apply(this, this.completed());
    },

    nextOrder: function () {
        if (!this.length) {
            return 1;
        }
        return this.last().get('order') + 1;
    },

    comparator: function (todo) {
        return todo.get('order');
    }




});

app.Todos = new TodoList();