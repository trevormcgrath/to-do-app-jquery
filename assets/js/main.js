$(document).ready(function() {

    var todoApp = (function($) {

        /* Global Variables */
        var todoTasks = [],
            completedTasks = [],
            /*DOM Elements*/
            $taskInput = $("#task-input"),
            $taskSubmit = $('#task-submit'),
            $todoList = $('#todo-list'),
            $completedList = $('#completed-list');

        /* End globals */

        $taskInput.submit(function(e) { e.preventDefault(); }); //Stopping the normal form behavior.


        /*** $taskSubmit:
        Add a task from input into the todoTasks array, then clear the input. ***/
        $taskSubmit.click(function(event) {
            var input = $taskInput.find("input"),
                temp = input.val().trim(),
                temp_id = temp.replace(/\s+/g, '-').toLowerCase(),
                taskHTML = "";

            console.log(temp_id);

            // Build task HTML
            taskHTML += '<li>';
            taskHTML += '<input type="checkbox" id="' + temp_id + '">';
            taskHTML += '<label for="' + temp_id + '">';
            taskHTML += '<span class="complete"></span>';
            taskHTML += temp;
            taskHTML += '</label>';
            taskHTML += '<span class="remove"></span>';
            taskHTML += '</li>';

            //Add task to top of list
            $todoList.prepend(taskHTML);

            //Reset input value
            input.val("");
        });

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


        /* this will be the HTML <li> item for the COMPLETED list:

            $completedList.append('<li><span id="add"><img src="assets/images/add.png" /></span> <span id="the-task">'+temp+'</span> </label><span id="trash"><img src="assets/images/trash.png" /></span></li>');
        */

    }(jQuery));

});
