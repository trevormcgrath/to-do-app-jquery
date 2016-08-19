$(document).ready(function() {
	console.log('jquery loaded');
	$("#task-input").submit(function(e){e.preventDefault();}); //Stopping the normal form behavior.

	/* Global Variables */
		var toDoTasks = [];
		var completedTasks =[];
	/* End globals */

	$('#task-submit').click(function(event) {
		toDoTasks.push($('#task-value').val());
	});
	

	console.log(toDoTasks);


});