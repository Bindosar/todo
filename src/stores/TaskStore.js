import axios from "axios";
import { makeAutoObservable } from "mobx";

class TasksStore {
  tasks = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/tasks");
      this.tasks = response.data;
    } catch (error) {
      console.error("TasksStore -> fetchTasks -> error", error);
    }
  };
  createTask = async (newTask) => {
    try {
      const res = await axios.post("http://localhost:8000/tasks", newTask);
      this.tasks.push(res.data);
    } catch (error) {}
  };
  DeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${taskId}`);
      this.tasks = this.tasks.filter((task) => task.id !== +taskId);
    } catch (error) {
      console.log("tasksStore -> deletetask -> error", error);
    }
  };
  updateTask = async (updatedTask) => {
    try {
      await axios.put(
        `http://localhost:8000/tasks/${updatedTask.id}`,
        updatedTask
      );
      const task = this.tasks.find((task) => task.id === updatedTask.id);
      for (const key in task) task[key] = updatedTask[key];
    } catch (error) {
      console.log("TasksStore -> updateTask -> error", error);
    }
  };
}

const tasksStore = new TasksStore();
tasksStore.fetchTasks();
export default tasksStore;
