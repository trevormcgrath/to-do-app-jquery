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

        function fetchStoredTasks() {
            taskCount = storedTasks.length;
            $.each(storedTasks, function(i) {
                createTask(storedTasks[i]);
            });
            console.log(storedTasks);
        }

        function getTaskLi(target) {
            //Get task li element
            return $(target).closest('li');
        }

        function checkmarkButton(_task) {
            //Get task li element
            _task = getTaskLi(_task.target);
            if (_task !== "") {
                $(_task).slideUp(230);
                setTimeout(
                    function() {
                        if ($todoListBtn.hasClass(active)) {
                            $completedList.prepend(_task);
                        } else {
                            $todoList.prepend(_task);
                        }

                        $(_task).show();
                    }, animationSpeed);
            }
        }

        function removeButton(_task) {
            //Get task li element
            _task = getTaskLi(_task.target);

            //slide up task
            $(_task).slideUp(230);
            //delay task removal
            setTimeout(
                function() {
                    //remove task
                    $(_task).remove();
                },
                animationSpeed);
        }

        //Fetch Todos
        fetchStoredTasks();


        //Stopping the normal form behavior.
        $taskInput.submit(function(e) { e.preventDefault(); });

        function createTask(task) {
            var html = "";
            taskCount = storedTasks.length;
            task.id = task.taskCount;

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

        /*** $taskSubmit:
        Add a task from input into the todoTasks array, then clear the input. ***/
        $taskSubmit.click(function() {

            var input = $taskInput.find("input"),
                todo = input.val().trim(),
                task = {};

            if (todo !== "") {
                task.todo = todo;
                task.id = Math.random() * 1000;

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



        $taskLists.on('click', '.taskLabel', checkmarkButton);
        $taskLists.on('click', '.remove', removeButton);

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
