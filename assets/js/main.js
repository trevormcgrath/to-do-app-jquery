$(document).ready(function() {

    var todoApp = (function($) {
        console.log('jquery loaded');

        /* Global Variables */
        var todoTasks = [],
            completedTasks = [],
            /*DOM Elements*/
            $taskInput = $("#task-input"),
            $taskSubmit = $('#task-submit');
        /* End globals */

        $taskInput.submit(function(e) { e.preventDefault(); }); //Stopping the normal form behavior.

        $taskSubmit.click(function(event) {
            todoTasks.push($taskInput.val());
            console.log(todoTasks);

        });


        console.log(todoTasks);
    }(jQuery));

});
