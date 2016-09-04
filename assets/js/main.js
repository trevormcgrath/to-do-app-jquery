$(document).ready(function() {

    var todoApp = (function($) {

        var active = 'active',
            visible = 'visible',
            animationSpeed = 250,
            taskCount = 0,
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
            storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        function getTaskLi(target) {
            //Get task li element
            return $(target).closest('li');
        }

        function fetchStoredTasks() {
            //cycle through local storage 'tasks'
            $.each(storedTasks, function(i) {
                //build task lists
                createTask(storedTasks[i]);
            });
            //rewrite local storage 'tasks'
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        function createTask(task) {
            var html = "";
            taskCount += 1;
            //assign task id
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

            //if task is complete
            if (!task.complete) {
                //Add task to todo list
                $todoList.prepend(html);
            } else {
                //Add task to completed list
                $completedList.prepend(html);
            }
        }

        function checkmarkButton(task) {
            //Get task li element
            task = getTaskLi(task.target);
            // slide task out of list
            $(task).slideUp(230);
            // delay task completion
            setTimeout(
                function() {
                    // if todo list tab is active
                    if ($todoListBtn.hasClass(active)) {
                        // send task to completed list
                        $completedList.prepend(task);
                    } else {
                        //send task to todo list
                        $todoList.prepend(task);
                    }
                    // display task
                    $(task).show();
                }, animationSpeed);
        }

        function removeButton(task) {
            //Get task li element
            task = getTaskLi(task.target);
            // slide task out of list
            $(task).slideUp(230);
            //delay task removal
            setTimeout(
                function() {
                    // remove task
                    $(task).remove();
                }, animationSpeed);
        }

        function getTask($el) {
            // turn elem to jQuery obj
            $el = $($el);
            /* ------------------------------------------
             * return appropreate task obj
             * depending on click target
             * ------------------------------------------ */
            if ($el.hasClass('taskLabel')) {
                return {
                    todo: $el.text(),
                    id: Number($el.attr('for'))
                };
            } else {
                return {
                    todo: $el.prev().text(),
                    id: Number($el.siblings('input').attr('id'))
                };
            }

        }

        function taskIsAMatch(task) {
            // cycle through local storage 'tasks'
            for (var i = 0; i < storedTasks.length; i++) {
                // assign current task
                var storedTask = storedTasks[i];
                /* ------------------------------------------
                 * return current task IF
                 * 1. current task text = stored task text
                 * 2. current task id = stored task id
                 * ------------------------------------------ */
                if (task.todo === storedTask.todo &&
                    task.id === storedTask.id) {
                    return storedTask;
                }
            }
        }
        // Fetch Todos
        fetchStoredTasks();

        // on submit: prevent default behavior.
        $taskInput.submit(function(e) { e.preventDefault(); });

        /* ------------------------------------------
         * $taskSubmit:
         * Add a task from input into the
         * todoTasks array, then clear the input.
         * ------------------------------------------*/
        $taskSubmit.click(function() {
            // find input feild
            var input = $taskInput.find("input"),
                // get todo text
                todo = input.val().trim(),
                // init task obj
                task = {};

            // if task input is not empty
            if (todo !== "") {
                // add todo text to task obj
                task.todo = todo;
                // push obj to stored tasks array
                storedTasks.push(task);
                //Add new task to DOM
                createTask(task);
                // write tasks json to local storage
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
            //Reset input value
            input.val("").focus();
        });

        // Todo list tabs
        $listTabBtns.click(function() {
            // get active tab
            var $activeTab = $(this),
                // get task input elm
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

        // on task click
        $taskLists.on('click', '.taskLabel, .remove', function(e) {
            // stop event bubbling
            e.stopPropagation();

            // target elm
            var $el = $(this),
                // current task
                task = getTask($el),
                // find matching task in local storage
                storedTask = taskIsAMatch(task),
                // current local storage task index
                tsk_ind = storedTasks.indexOf(storedTask);

            // if click target is task label or complete btn
            if ($el.hasClass('complete') || $el.hasClass('taskLabel')) {
                /* ------------------------------------------
                 * if task complete
                 * -> set storedTask.complete to true
                 * else
                 * -> set to false
                 * ------------------------------------------ */
                storedTask.complete = storedTask.complete ? false : true;
                // write 'tasks' to localStorage
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
                // complete task
                checkmarkButton(e);

            } else {
                // remove current task
                storedTasks.splice(tsk_ind, 1);
                // write 'tasks' to localStorage
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
                // remove task
                removeButton(e);
            }
        });
    }(jQuery));
});
