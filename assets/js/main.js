$(document).ready(function() {

    var todoApp = (function($) {

        /* Global Variables */
        var todoTasks = [],
            completedTasks = [],
            pageSwitch = true,
            //DOM Elements
            $inputSection = $('#input-section'),
            $taskInput = $("#task-input"),
            $taskSubmit = $('#task-submit'),
            //Lists
            $todoList = $('#todo-container'),
            $completedList = $('#completed-container'),
            $taskLists = $todoList.add($completedList),
            //Buttons
            $todoListBtn = $('#todo-list-btn'),
            $completedListBtn = $('#completed-list-btn'),
            $listTabBtns = $('header nav button'),
            animationSpeed = 150;

        /* End globals */

        $taskInput.submit(function(e) { e.preventDefault(); }); //Stopping the normal form behavior.


        /*** $taskSubmit:
        Add a task from input into the todoTasks array, then clear the input. ***/
        $taskSubmit.click(function(event) {

            var input = $taskInput.find("input"),
                taskText = input.val().trim(),
                text_id = taskText.replace(/\s+/g, '-').toLowerCase(),
                _$todoList = $('#todo-list'),
                taskHTML = "";

            // Build task HTML
            taskHTML += '<li>';
            taskHTML += '<input type="checkbox" id="' + text_id + '">';
            taskHTML += '<label class="taskLabel" for="' + text_id + '">';
            taskHTML += '<span class="complete"></span>';
            taskHTML += taskText;
            taskHTML += '</label>';
            taskHTML += '<span class="remove"></span>';
            taskHTML += '</li>';

            if (taskText != "") {
                //Add task to top of list
                _$todoList.prepend(taskHTML);
            }

            //Reset input value
            input.val("");
        });

        /*** $listTabBtns
        - Add 'active' class to list tab when clicked
        - Display active task list
        ***/
        $listTabBtns.click(function(e) {
            var $activeTab = $(this),
                taskInput = $taskInput.find('input');
            // remove active class
            $listTabBtns.removeClass('active');
            // remove visible class from both list-containers
            $todoList.add($completedList).removeClass('visible');
            // add active class to clicked tab
            $activeTab.addClass('active');

            // if active tab is "Todo"
            if ($activeTab.text().toLowerCase() === 'todo') {
                // add 'visible' class
                $todoList.addClass('visible');
                // Display Input Section
                $inputSection.slideDown(animationSpeed);
                // Focus on Task Input
                taskInput.focus();
            } else {
                // Hide Input Section
                $inputSection.slideUp(animationSpeed);
                // add class to 'completed' tab
                $completedList.addClass('visible');

            }
        });

        function checkmarkButton(temp) {
            temp = $(temp.target).closest('li');
            if (temp != "") {

                $(temp).slideUp(230);
                setTimeout(
                    function() {

                        if ($('#todo-list-btn').hasClass('active')) {
                            $('#completed-list').prepend(temp);
                        } else {
                            $('#todo-list').prepend(temp);
                        }

                        $(temp).show();
                    },
                    250
                );
            }
        }

        function removeButton(temp) {
            temp = $(temp.target).closest('li');
            $(temp).slideUp(230);
            setTimeout(
                function() {
                    $(temp).remove();
                },
                250
            );
        }

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
