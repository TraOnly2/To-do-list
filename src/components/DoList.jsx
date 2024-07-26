import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTasks, setEditTask] = useState(null);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== ""){
      if(editTasks !== null){
        const updateTasks = tasks.map((task, index) => index === editTasks ? newTask : task);
        setTasks(updateTasks);
        setEditTask(null);
      }else{
        setTasks([...tasks, newTask]);
      }
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updateTasks = tasks.filter((_, i) => i !== index);
    setTasks(updateTasks);

    if(editTasks === index){
      setEditTask(null);
    }
    setNewTask("")
  }

  function handleEditClick(index) {
      setEditTask(index);
      setNewTask(`${tasks[index]}`);
  }

  // function handleSaveClick(index) {
  //   addTask(index);
  //   setEditTask(index)
  //   setNewTask("");
  // }

  return (
    <div className="To-Do-List">
      <h1>To-Do-List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          {editTasks !== null ? <i className="far fa-save"></i>:<i className="fas fa-plus-square"></i>}
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <button className="edit-button" onClick={() => handleEditClick(index)}>{editTasks !== null ? <i className="fa fa-check" aria-hidden="true"></i> : <i className="fas fa-edit"></i>}</button>
            <button className="delete-button" onClick={() => deleteTask(index)}><i className="fa fa-trash" aria-hidden="true"></i></button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
