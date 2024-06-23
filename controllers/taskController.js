import { StatusCodes } from "http-status-codes";

import Task from "../models/Task.js";

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.userId });

  res.status(StatusCodes.OK).json({ tasks });
};

const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const task = await Task.create(req.body);

  res.status(StatusCodes.CREATED).json({ task });
};

const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  res.status(StatusCodes.OK).json({ task });
};

const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ task });
};

const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({ task });
};

export { getAllTasks, createTask, getTask, updateTask, deleteTask };
