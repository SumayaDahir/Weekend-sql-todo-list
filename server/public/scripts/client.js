$("document").ready(readyNow);
//click listeners for buttons (add button, delete button and edit button)
//call the getList function
function readyNow() {
  console.log("JS and JQ");
  getList();
  $("#add-task").on("click", newTask);
  $("#todolist").on("click", ".delete-btn", deleteTask);
  $("#todolist").on("click", ".edit-btn", editTask);
}

//function to append task list on the DOM
//empty current task list on the page
//for loop through task list 
//append task list
//add delete button and complete button to the DOM
function appendDOM(lists) {
    $("#todolist").empty();
    for (let i = 0; i < lists.length; i++) {
      let list = lists[i];
      console.log("in list", list);
      let className = '';
      if (list.completed) {
        className = 'complete';
      } else if (!list.completed) {
        className = 'edit-btn';
      }
     let tableRow =  $("#todolist").append(`
   <tr>
          <td> ${list.new_task} </td>
          <td> ${list.date} </td>
           <td> ${list.completed ? "yes" : "no"}</td>
          <td> ${list.notes}</td>
          <td> ${list.appointments ? "yes" : "no"} </td>
          <td> <button data-listid="${list.id}" class="delete-btn"> DELETE </button></td>
          <td> <button data-listid="${list.id}" class="${className}"> COMPLETE </button></td>
          </tr>`);
  
          tableRow.data('listid', list.id);
          $('#todolist').append(tableRow);
    }
  }
  
//GET
//function to get task list from the server
//if successful call appendDOM function  

function getList() {
  console.log("in getList");
  $.ajax({
    method: "GET",
    url: "todo/todo",
  }).then(function (response) {
    appendDOM(response);
  });
}

//Post
//create a function to add a new task on to do list
//send a post request to the server using ajax post method
//if successful call getList function
//if there are any errors display an error alert

function newTask() {
  console.log("in newTask");
  //create new object
  let newTask = {
    new_task: $("#new_task").val(),
    date: $("#date").val(),
    completed: $("#completed").val(),
    notes: $("#notes").val(),
    appointments: $("#appointments").val(),
  };
  console.log(newTask);
  //clear input fields
  $("#new_task").val("");
  $("#date").val("");
  $("#completed").val("");
  $("#notes").val("");
  $("#appointments").val("");

  $.ajax({
    method: "POST",
    url: "todo/todo",
    data: newTask,
  })
    .then(function (response) {
      console.log("Response from server.", response);
      getList();
    })
    .catch(function (error) {
      console.log("Error in POST", error);
      alert("Unable to add task at this time. Please try again later.");
    });
};


//create a function to edit task
//it gets the id of the task to edit from the button's data attribute
//ajax sends a put request method to the server
//call getList function if successful
//catch any errors if it is not successful

function editTask(event) {
    let taskID = $(event.target).data('listid');
    console.log(taskID);
    $.ajax({
        url: `/todo/completed/${taskID}`,
        method: "PUT",
      })    
      .then((res) => getList())
      .catch((err) => alert(err))
      };

//function to delete task 
//get the id of the task to delete from the button's data attribute.
//send delete request to the server using ajax
//call getList function if successful
//catch any errors if it is not successful

function deleteTask(event) {
  const id = $(event.target).data('listid');
  $.ajax({
    method: "DELETE",
    url: `/todo/${id}`,
  })
.then((res) => getList())
.catch((err) => alert(err))
};

