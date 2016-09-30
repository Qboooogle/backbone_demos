//视图一般包含如下内容：
//1 视图的根元素
//2 初始化函数
//3 绘制（渲染）函数

var app = app || {};

app.BookView = Backbone.View.extend({

    tagName:'div',

    className:'book-container',

    template: _.template($('#book-template').html()),

    events:{
        'click .delete':'deleteBook'
    },

    initialize:function(){
        this.listenTo(this.model,'destroy',this.remove);
    },

    render: function () {
        this.$el.html(this.template(
            this.model.toJSON()
        ));
        return this;
    },

    deleteBook:function(){
        this.model.destroy();
    }
});

