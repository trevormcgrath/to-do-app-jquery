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
            storedTasks = JSON.parse(localStorage.getItem('tasks')) || [],
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
        }

        function createTask(task) {
            var html = "";
            taskCount += 1;

            task.id = taskCount;

            // Build task HTML
            html += '<li>';
            html += '<input type="checkbox" id="' + task.id + '"';
            html += task.complete ? 'checked' : null;
            html += '>';
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

                localStorage.setItem('tasks', JSON.stringify(storedTasks));
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

        function getTask($el) {
            $el = $($el);

            if ($el.hasClass('taskLabel')) {
                return {
                    todo: $el.text(),
                    id: Number($el.attr('for'))
                }
            } else {
                return {
                    todo: $el.prev().text(),
                    id: Number($el.siblings('input').attr('id'))
                }
            }

        }

        function taskIsAMatch(task, storedTask) {

            // for (var i = 0; i < storedTasks.length; i++) {
            //     var storedTask = storedTasks[i];

            //     if (task.todo === storedTask.todo &&
            //         task.id === storedTask.id) {

            //         return true;
            //     } else {
            //         return false;
            //     }
            // }

            return (task.todo === storedTask.todo &&
                task.id === storedTask.id);
        }
        // $taskLists.on('click', '.taskLabel', checkmarkButton);
        // $taskLists.on('click', '.remove', removeButton);
        $taskLists.on('click', '.taskLabel, .remove', function(e) {
            e.stopPropagation();

            var $el = $(this),
                task = getTask($el);

            if ($el.hasClass('complete') || $el.hasClass('taskLabel')) {

                for (var i = 0; i < storedTasks.length; i++) {
                    var storedTask = storedTasks[i];
                    if (task.todo === storedTask.todo &&
                        task.id === storedTask.id) {
                        storedTask.complete = true;
                        console.log(task);
                        localStorage.setItem('tasks', JSON.stringify(storedTasks));
                        checkmarkButton(e);
                    }
                }

            } else {
                for (var i = 0; i < storedTasks.length; i++) {
                    var storedTask = storedTasks[i];

                    console.log(taskIsAMatch(task, storedTask));

                    if (task.todo === storedTask.todo &&
                        task.id === storedTask.id) {
                        storedTasks.splice(i, 1);
                        localStorage.setItem('tasks', JSON.stringify(storedTasks));
                        removeButton(e);
                    }
                }
            }
        })
    }(jQuery));
});
