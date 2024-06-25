import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

import customFetch from "../utils/customFetch";

import { AddTask, TaskContainer } from "../components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/tasks");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/tasks", data);
    toast.success("Task added successfully");
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const ToDoListContext = createContext();

const ToDoList = () => {
  const { data } = useLoaderData();

  return (
    <ToDoListContext.Provider value={{ data }}>
      <AddTask />
      <TaskContainer />
    </ToDoListContext.Provider>
  );
};

export const useToDoListContext = () => useContext(ToDoListContext);

export default ToDoList;
