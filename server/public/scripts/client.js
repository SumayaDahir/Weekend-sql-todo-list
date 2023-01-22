$("document").ready(readyNow);

function readyNow() {
  console.log("JS and JQ");
  getList();
  $("#add-task").on("click", newTask);
  $("#todolist").on("click", ".delete-btn", deleteTask);
  $("#todolist").on("click", ".edit-btn", editTask);
}

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

        tableRow.data('id', list.id);
        $('#todolist').append(tableRow);
  }
}

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
  //clear inputs
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


//update

function editTask(event) {
    let taskID = $(event.target).data('listid');
    console.log(taskID);
    $.ajax({
        url: `/todo/completed/${taskID}`,
        method: "PUT",
      })    
        .then(() => {
          getList();
        })
        .catch((error) => {
          console.log("check", error);
        });

}


//delete task

function deleteTask(event) {
  const id = $(event.target).data('listid');
  $.ajax({
    method: "DELETE",
    url: `/todo/${id}`,
  })
.then((res) => getList())
.catch((err) => alert(err))
};

