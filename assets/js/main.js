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
            var input = $taskInput.find("input");
            todoTasks.push(input.val().trim());
            console.log(todoTasks);
            input.val("");

        });

        console.log(todoTasks);
    }(jQuery));

});
