// src/components/TaskManager.js
"use client";

import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, editTask, toggleComplete } from "../tasksSlice";
import { useState } from "react";
import { Box, Button, Input, List, ListItem, Flex, Text, Select, Checkbox, useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

function TaskManager() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [taskText, setTaskText] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [taskPriority, setTaskPriority] = useState("low");
  const [editingTask, setEditingTask] = useState(null);
  const toast = useToast();

  const handleAddTask = () => {
    if (!taskText || !taskDueDate || !taskCategory) {
      toast({
        title: "Error",
        description: "All fields are required",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (editingTask) {
      dispatch(editTask({
        id: editingTask.id,
        text: taskText,
        dueDate: taskDueDate,
        category: taskCategory,
        priority: taskPriority,
        completed: editingTask.completed,
      }));
      toast({
        title: "Success",
        description: "Task edited successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      dispatch(addTask({
        id: uuidv4(),
        text: taskText,
        dueDate: taskDueDate,
        category: taskCategory,
        priority: taskPriority,
        completed: false,
      }));
      toast({
        title: "Success",
        description: "Task added successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }

    setTaskText("");
    setTaskDueDate("");
    setTaskCategory("");
    setTaskPriority("low");
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setTaskText(task.text);
    setTaskDueDate(task.dueDate);
    setTaskCategory(task.category);
    setTaskPriority(task.priority);
    setEditingTask(task);
  };

  const handleDeleteTask = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id));
      toast({
        title: "Success",
        description: "Task deleted successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  return (
    <Box>
      <Input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Task Description"
        mb={2}
      />
      <Input
        type="date"
        value={taskDueDate}
        onChange={(e) => setTaskDueDate(e.target.value)}
        placeholder="Due Date"
        mb={2}
      />
      <Input
        value={taskCategory}
        onChange={(e) => setTaskCategory(e.target.value)}
        placeholder="Category"
        mb={2}
      />
      <Select
        value={taskPriority}
        onChange={(e) => setTaskPriority(e.target.value)}
        mb={4}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </Select>
      <Button onClick={handleAddTask} colorScheme="teal" mb={4}>
        {editingTask ? "Edit Task" : "Add Task"}
      </Button>
      <List spacing={3}>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <Flex alignItems="center" justifyContent="space-between">
              <Box>
                <Text as={task.completed ? "s" : "span"}>{task.text}</Text>
                <Text fontSize="sm" color="gray.500">{task.dueDate}</Text>
                <Text fontSize="sm" color="gray.500">{task.category}</Text>
                <Text fontSize="sm" color="gray.500">{task.priority}</Text>
              </Box>
              <Box>
                <Checkbox isChecked={task.completed} onChange={() => handleToggleComplete(task.id)}>
                  Complete
                </Checkbox>
                <Button size="sm" colorScheme="blue" onClick={() => handleEditTask(task)} ml={2}>
                  Edit
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDeleteTask(task.id)} ml={2}>
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
