import React from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import NoTasksFound from "./NoTasksFound";

export default function TaskBoard() {
  const defaultTasks = {
    id: crypto.randomUUID(),
    title: "Task 1",
    description: "This is task 1",
    tags: ["tag1", "tag2"],
    priority: "High",
    isFavourite: false,
  };
  const [tasks, setTasks] = useState([defaultTasks]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  /* function handleAdTask() {
    setIsModalOpen(true);
 }
 */
  function handleAddEditTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setIsModalOpen(false);
  }
  function handleCloseClick() {
    setIsModalOpen(false);
    //setTaskToUpdate(null);
  }
  function handleEditTask(task) {
    setTaskToUpdate(task); // ekhane serial maintan hhhobe.
    setIsModalOpen(true);
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }
  function handleAllDeletek() {
    setTasks([]);
    //tasks.length = 0; // this is the best way to delete all tasks from array.
    //setTasks([...tasks]); // this is the best way to delete all tasks from array.
  }

  function handleFavourite(taskId) {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isFavourite: !task.isFavourite };
        }
        return task;
      })
    );
  }
  function handleSearch(searchTerm) {
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks([...filteredTasks]); // Fixed the syntax error by replacing [.. with [...
  }

  return (
    <section className=" mb-20" id="tasks">
      {isModalOpen && ( //logical operator &&
        <AddTaskModal
          onSave={handleAddEditTask}
          onCloseClick={handleCloseClick}
          taskToUpdate={taskToUpdate}
        />
      )}
      <div className="container">
        <SearchTask onSearch={handleSearch} />

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddTask={() => setIsModalOpen(true)}
            onDeleteAll={handleAllDeletek}
          />
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFav={handleFavourite}
            />
          ) : (
            <NoTasksFound />
          )}
        </div>
      </div>
    </section>
  );
}
