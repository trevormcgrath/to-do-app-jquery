$(document).ready(function() {

    var todoApp = (function($) {

        /* Global Variables */
        var active = 'active',
            visible = 'visible',
            animationSpeed = 250,

            //DOM Elements
            $inputSection = $('#input-section'),
            $taskInput = $("#task-input"),
            $taskSubmit = $('#task-submit'),
            //Lists
            $todoListCont = $('#todo-container'),
            $completedListCont = $('#completed-container'),
            $taskLists = $todoListCont.add($completedListCont),
            $todoList = $('#todo-list'),
            $completedList = $('#completed-list'),
            //Buttons
            $todoListBtn = $('#todo-list-btn'),
            $listTabBtns = $('header nav button'),
            //Local Storage
            storedTasks = JSON.parse(localStorage.getItem('tasks')) || [{
                id: 124,
                todo: "Task todo number 2",
                complete: false
            }, {
                id: 123,
                todo: "Task todo number 1",
                complete: true
            }, {
                id: 121,
                todo: "Task todo number 3",
                complete: false
            }],
            taskCount = 0;

        /* End globals */

        function getTaskLi(target) {
            //Get task li element
            return $(target).closest('li');
        }

        function fetchStoredTasks() {
            $.each(storedTasks, function(i) {
                createTask(storedTasks[i]);
            });
            console.log(storedTasks);
        }

        function createTask(task) {
            var html = "";
            taskCount = storedTasks.length;
            // task.id = taskCount;

            // Build task HTML
            html += '<li>';
            html += '<input type="checkbox" id="' + task.id + '">';
            html += '<label class="taskLabel" for="' + task.id + '">';
            html += '<span class="complete"></span>';
            html += task.todo;
            html += '</label>';
            html += '<span class="remove"></span>';
            html += '</li>';

            //Add new task to DOM
            if (!task.complete) {
                $todoList.prepend(html);
            } else {
                $completedList.prepend(html);
            }
        }

        function checkmarkButton(task) {
            //Get task li element
            task = getTaskLi(task.target);
            if (task !== "") {
                $(task).slideUp(230);
                setTimeout(
                    function() {
                        if ($todoListBtn.hasClass(active)) {
                            $completedList.prepend(task);
                        } else {
                            $todoList.prepend(task);
                        }
                        $(task).show();
                    }, animationSpeed);
            }
        }

        function removeButton(task) {
            //Get task li element
            task = getTaskLi(task.target);

            //slide up task
            $(task).slideUp(230);
            //delay task removal
            setTimeout(
                function() {
                    //remove task
                    $(task).remove();
                },
                animationSpeed);
        }

        //Fetch Todos
        fetchStoredTasks();


        //Stopping the normal form behavior.
        $taskInput.submit(function(e) { e.preventDefault(); });



        /*** $taskSubmit:
        Add a task from input into the todoTasks array, then clear the input. ***/
        $taskSubmit.click(function() {

            var input = $taskInput.find("input"),
                todo = input.val().trim(),
                task = {};

            if (todo !== "") {
                task.todo = todo;

                storedTasks.push(task);
                //Add new task to DOM
                createTask(task);

                console.log(storedTasks);
            }

            //Reset input value
            input.val("").focus();
        });


        /*** $listTabBtns
        - Add 'active' class to list tab when clicked
        - Display active task list
        ***/
        $listTabBtns.click(function() {
            var $activeTab = $(this),
                taskInput = $taskInput.find('input');
            // remove active class
            $listTabBtns.removeClass(active);
            // remove visible class from both list-containers
            $todoListCont.add($completedListCont).removeClass(visible);
            // add active class to clicked tab
            $activeTab.addClass(active);

            // if active tab is "Todo"
            if ($activeTab.text().toLowerCase() === 'todo') {
                // add visible class
                $todoListCont.addClass(visible);
                // Display Input Section
                $inputSection.slideDown(animationSpeed);
                // Focus on Task Input
                taskInput.focus();
            } else {
                // Hide Input Section
                $inputSection.slideUp(animationSpeed);
                // add class to 'completed' tab
                $completedListCont.addClass(visible);
            }
        });



        // $taskLists.on('click', '.taskLabel', checkmarkButton);
        // $taskLists.on('click', '.remove', removeButton);
        $taskLists.on('click', '.taskLabel, .remove', function(e) {
            e.stopPropagation();
            var $el = $(this);

            if ($el.hasClass('complete') || $el.hasClass('taskLabel')) {
                checkmarkButton(e);
            } else {

                var task = {
                    todo: $el.prev().text(),
                    id: Number($el.siblings('input').attr('id'))
                };

                $.each(storedTasks, function(i) {
                    var storedTask = storedTasks[i];

                    if (task.todo === storedTask.todo &&
                        task.id === storedTask.id) {
                        removeButton(e);
                        storedTasks.splice(i, 1);
                    }
                });
                console.log(storedTasks);
            }
        })

        /*** Objectives / Plan:

            Short run:
                - When the $todoList's <span id="complete"> is clicked, take <span id="the-task">.html()
                    into a varibale, put into the $completedList.append() below.

                - When the $todoLis's <span id="remove"> is clicked, put into the... $completedList ?

                - When the $completedList's <span id="add"> is clicked, put back into the $todoList and
                    show a notification

                - When the $completedList's <span id="trash"> is clicked, make an alert "Permanently delete?"
                    then just .remove()

            Long run:
                - In the header area, make the 'Todo' and 'Complete' buttons toggle an add/remove class
                transition thing to show the different <div id="todo-container"> versus <div id="completed-container">

                - Add styles to make app look good, use min-width and build mobile styles first, then outwards towards desktop

        ***/
    }(jQuery));
});
