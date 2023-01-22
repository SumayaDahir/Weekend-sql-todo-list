$("document").ready(readyNow);

function readyNow() {
  console.log("JS and JQ");
  getList();
}

function appendDOM(lists) {
  $("#todolist").empty();
  for (let i = 0; i < lists.length; i++) {
    let list = lists[i];
    console.log("in list", list);
    $("#todolist").append(`
 <tr>
        <td> ${list.date} </td>
        <td> ${list.priority} </td>
         <td> ${list.completed ? "yes" : "no"}</td>
        <td> ${list.notes}</td>
        <td> ${list.appointments ? "yes" : "no"} </td>
        <td> <button data-id="${
          list.id
        }" class="delete-btn"> DELETE </button></td>
        </tr>`);
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
    date: $("#date").val(),
    priority: $("#priority").val(),
    completed: $("#completed").val(),
    notes: $("#notes").val(),
    appointments: $("#appointments").val(),
  };
  console.log(newTask);
  //clear inputs

  $("#date").val("");
  $("#priority").val("");
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
