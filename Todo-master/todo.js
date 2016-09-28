$(function() {
    //Todo model
    var Todo = Backbone.Model.extend({
        defaults: function() {
            return {
                title: "empty to...",
                order: Todos.nextOrder(),
                done: false
            };
        },
        toggle: function() {
            this.save({
                done: !this.get("done")//get获取属性
            })
        }
    });
    //Todo Collection
    var TodoList = Backbone.Collection.extend({
        model: Todo,
        localStorage: new Backbone.LocalStorage("todos-backbone"), //todos-backbone命名空间
        //过滤已完成的item
        done: function() {
            return this.where({  //where()遍历done=true返回数组toggle-all
                done: true
            });
        },
        //过滤未完成的item
        remaining: function() {
        	return this.where({
        		done:false
        	})                   
        },
        nextOrder:function(){
        	if (!this.length) return 1;
            return this.last().get('order') + 1;
        },
        //排序
        comparator: 'order'
    });

    //新建全局Collection--Todos
    var Todos = new TodoList;
    //todo item的dom元素 操作view
    var TodoView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#item-template').html()),
        events: {
            "click .toggle": "toggleDone",
            'dblclick .view': 'edit',
            'click a.destroy': 'clear',
            'keypress .edit': 'updateOnEnter',
            'blur .edit': 'close'
        },
        initialize: function() {
            //this is the view
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
            console.log('this.model.toJSON()',this.model.toJSON())
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('done', this.model.get('done'));
            this.input = this.$('.edit');
            return this;
        },
        toggleDone: function() {
            this.model.toggle();
        },
        edit: function() {
            this.$el.addClass('editing');
            this.input.focus();
        },
        //关闭editing mode,saving changes to the todo 
        close: function() {
            var value = this.input.val();
            if (!value) {
                this.clear();
            } else {
                this.model.save({
                    title: value
                });
                this.$el.removeClass("editing");
            }
        },
        //敲击enter编辑该item
        updateOnEnter: function(e) {
            if (e.keyCode == 13) {
            	console.log(9)
            	this.close();
            }
        },
        clear: function() {
            this.model.destroy();
        }
    });
    //the application  新增View
    var AppView = Backbone.View.extend({
        el: $('#todoapp'),
        statsTemplate: _.template($('#stats-template').html()),
        events: {
            "keypress #new-todo": "createOnEnter",
            "click #clear-completed": "clearCompleted",
            "click #toggle-all": "toggleAllComplete"
        },
        initialize: function() {
            this.input = this.$('#new-todo');
            this.allCheckbox = this.$('#toggle-all')[0];

            this.listenTo(Todos, 'add', this.addOne);
            this.listenTo(Todos, 'reset', this.addAll);
            this.listenTo(Todos, 'all', this.render);
            this.footer = this.$('footer');
            this.main = $('#main');
            Todos.fetch();//从服务器拉取数据
        },
        render: function() {
            var done = Todos.done().length;
            var remaining = Todos.remaining().length;

            if (Todos.length) {
                this.main.show();
                this.footer.show();
                this.footer.html(this.statsTemplate({ done: done, remaining: remaining }));
            } else {
                this.main.hide();
                this.footer.hide();
            }
            this.allCheckbox.checked = !remaining;
        },
        //添加一条item到list中
        addOne: function(todo) {
            var view = new TodoView({
                model: todo
            });
            this.$('#todo-list').append(view.render().el);
        },
        //
        addAll: function() {
            Todos.each(this.addOne, this);
        },
        //输入框键盘点击事件，修改
        createOnEnter: function(e) {
            if (e.keyCode != 13) return;
            if (!this.input.val()) return;

            Todos.create({
            	title:this.input.val()
            });
            this.input.val('');
        },
        //移除所有done item, destroy它们的models
        clearCompleted: function() {
            _.invoke(Todos.done(), 'destroy');
            return false;
        },
        toggleAllComplete: function() {
            var done = this.allCheckbox.checked;
            console.log('done',done)
            Todos.each(function(todo) {
                console.log('todo',todo);
                todo.save({ 'done': done });
            });
        }
    });

    var App = new AppView;
})

