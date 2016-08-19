$(document).ready(function() {

    var todoApp = (function($) {

        /* Global Variables */
        var todoTasks = [],
            completedTasks = [],
            /*DOM Elements*/
            $taskInput = $("#task-input"),
            $taskSubmit = $('#task-submit');
            $todoList = $('#todo-list');
        /* End globals */

        $taskInput.submit(function(e) { e.preventDefault(); }); //Stopping the normal form behavior.


        /*** $taskSubmit: 
        Add a task from input into the todoTasks array, then clear the input. ***/
        $taskSubmit.click(function(event) {
            var input = $taskInput.find("input");
            var temp = input.val().trim();
            $todoList.append('<li><input type="checkbox"><label for=""> '+temp+' </label><span>x</span></li>');
            todoTasks.push(input.val().trim());
            console.log(todoTasks);
            input.val("");
            
        });

        //<li><input type="checkbox"><label for="">Lorem ipsum.</label><span>x</span></li>
        function taskAddition(){
            for (var i = todoTasks.length - 1; i >= 0; i--) {
                $todoList.append('<li><input type="checkbox"><label for=""> '+todoTasks[i]+' </label><span>x</span></li>');
            }
        };

        
        
    }(jQuery));

});
