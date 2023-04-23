//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

/*incompleteTasks*/
/*editMode*/
var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("todo-items");//ul of #incompleteTasks
var completedTasksHolder=document.getElementById("completed-items");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

  var listItem=document.createElement("li");

  //input (checkbox)
  var checkBox=document.createElement("input");//checkbx
  //label
  var taskName=document.createElement("span");//label
  //input (text)
  var editInput=document.createElement("input");//text
  //button.edit
  var editButton=document.createElement("button");//edit button

  //button.delete
  var deleteButton=document.createElement("button");//delete button
  var deleteButtonImg=document.createElement("img");//delete button image
  
  listItem.className = "link";
  taskName.innerText=taskString;
  taskName.className="task task-name";

  //Each elements, needs appending
  checkBox.type="checkbox";
  checkBox.className = "checkbox";

  editInput.type="text";
  editInput.className="task task-input task-input_save";

  editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
  editButton.className="button edit";

  deleteButton.className="button delete";
  deleteButtonImg.src="./remove.svg";
  deleteButton.appendChild(deleteButtonImg);
  deleteButtonImg.className = "delete__img"


  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(taskName);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



var addTask=function(){
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  var listItem=this.parentNode;

  var editInput=listItem.querySelector(".task-input");
  var taskName=listItem.querySelector("span");
  var editBtn=listItem.querySelector(".edit");

  var containsClass=listItem.classList.contains("link_edit");
  console.log(containsClass)
  //If class of the parent is .editmode
  if(containsClass){

  //switch to .editmode
  //label becomes the inputs value.
  taskName.innerText=editInput.value;
  editBtn.innerText="Edit";
  }else{
  editInput.value=taskName.innerText;
  editBtn.innerText="Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("link_edit");
  editInput.classList.toggle("task-input_save");
  editInput.classList.toggle("task-input_edit");
  taskName.classList.toggle("task-name_disabled");
};

//Delete task.
var deleteTask=function(){
  console.log("Delete Task...");

  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  var listItem=this.parentNode;
  for (let item of listItem.children){
    if (item.classList.contains("task-name")){
      item.classList.add("task-name_complet");
  }
 }

  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem=this.parentNode;
  for (let item of listItem.children){
    if (item.classList.contains("task-name")){
      item.classList.remove("task-name_complet");
  }
 }
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
//select ListItems children
  var checkBox=taskListItem.querySelector(".checkbox");
  var editButton=taskListItem.querySelector("button.edit");
  var deleteButton=taskListItem.querySelector("button.delete");


  //Bind editTask to edit button.
  editButton.onclick=editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.