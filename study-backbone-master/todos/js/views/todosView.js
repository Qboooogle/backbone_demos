var app = app || {};

app.TodoView = Backbone.View.extend({

    tagName: 'li',

    template: _.template($('#item-template').html()),

//【事件处理】
//双击label标签，启用编辑
//键盘enter按下 更新当前的items
//鼠标键入.edit 关闭
//点击 .toggle 切换完成
//点击 .destroy 清除item
    events: {
        'dblclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close',
        'click .toggle': 'toggleCompleted',
        'click .destroy': 'clear'
    },

//初始化，监听模型的变化，销毁和可视性，调用相应的处理函数
    initialize: function () {
        //监听模型的改变
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'visible', this.toggleVisible);
    },

//渲染，
    render: function () {

        this.$el
            .html(this.template(this.model.toJSON()))
            .toggleClass('completed', this.model.get('completed'))

        this.toggleVisible();

        this.$input = this.$('.edit');
        return this;
    },

    edit: function () {
        this.$el.addClass('editing');
        this.$input.focus();
    },

    close: function () {
        var value = this.$input.val().trim();

        if (value) {
            this.model.save({
                title: value
            })
        }

        this.$el.removeClass('editing');
    },

    updateOnEnter: function (e) {
        if (e.keyCode == 13) {
            this.close()
        }
    },

    toggleCompleted: function () {

        this.model.toggle();

    },

    clear: function () {

        this.model.destroy();

    },

    toggleVisible: function () {
        this.$el.toggleClass('hidden', this.isHidden());
    },

    isHidden: function () {
        var isCompleted = this.model.get('completed');

        switch (app.TodoFilter) {
            case "active":
                return isCompleted;
                break;
            case "completed":
                return !isCompleted;
                break;
            case "":
                return false
                break;
        }
    }

});