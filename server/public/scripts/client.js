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
        <td> <button data-id="${list.id}" class="delete-btn"> DELETE </button></td>
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
};

//Post


