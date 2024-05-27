// src/components/TaskManager.js
"use client";

import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, editTask } from "../tasksSlice";
import { useState } from "react";
import { Box, Button, Input, List, ListItem, Flex, Text } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

function TaskManager() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [taskText, setTaskText] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [message, setMessage] = useState("");

  const handleAddTask = () => {
    if (!taskText) {
      setMessage("Task cannot be empty");
      return;
    }

    if (editingTask) {
      dispatch(editTask({ id: editingTask.id, text: taskText }));
      setMessage("Task edited successfully");
    } else {
      dispatch(addTask({ id: uuidv4(), text: taskText }));
      setMessage("Task added successfully");
    }

    setTaskText("");
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setTaskText(task.text);
    setEditingTask(task);
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
    setMessage("Task deleted successfully");
  };

  return (
    <Box>
      <Input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task"
        mb={2}
      />
      <Button onClick={handleAddTask} colorScheme="teal" mb={4}>
        {editingTask ? "Edit Task" : "Add Task"}
      </Button>
      {message && (
        <Text mb={4} color="green.500">
          {message}
        </Text>
      )}
      <List spacing={3}>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <Flex alignItems="center" justifyContent="space-between">
              <Text>{task.text}</Text>
              <Box>
                <Button size="sm" colorScheme="blue" onClick={() => handleEditTask(task)}>
                  Edit
                </Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </Button>
              </Box>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default TaskManager;
