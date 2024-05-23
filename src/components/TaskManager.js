import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, removeTask, toggleTask, editTask, loadTasks } from "../redux/taskSlice";
import { Box, Button, Input, List, ListItem, Select, Text, Stack, Heading } from "@chakra-ui/react";
import TaskFilter from "./TaskFilter";
import TaskEditor from "./TaskEditor";

const TaskManager = () => {
  const [taskText, setTaskText] = useState("");
  const [category, setCategory] = useState("Work");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [editingTask, setEditingTask] = useState(null);

  const tasks = useSelector((state) => state.tasks.tasks);
  const filters = useSelector((state) => state.tasks.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    dispatch(loadTasks(savedTasks));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch(addTask({ text: taskText, category, dueDate, priority }));
      setTaskText("");
      setCategory("Work");
      setDueDate("");
      setPriority("Medium");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskText(task.text);
    setCategory(task.category);
    setDueDate(task.dueDate);
    setPriority(task.priority);
  };

  const handleSaveTask = () => {
    dispatch(editTask({ id: editingTask.id, text: taskText, category, dueDate, priority }));
    setTaskText("");
    setCategory("Work");
    setDueDate("");
    setPriority("Medium");
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter(task => {
    const filterByCategory = filters.category === "All" || task.category === filters.category;
    const filterByPriority = filters.priority === "All" || task.priority === filters.priority;
    const filterByStatus = filters.status === "All" || (filters.status === "Completed" && task.completed) || (filters.status === "Incomplete" && !task.completed);
    return filterByCategory && filterByPriority && filterByStatus;
  });

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <Heading mb={4}>Task Manager</Heading>
      <TaskFilter />
      <Stack spacing={3}>
        <Input
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="New Task"
        />
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </Select>
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Select>
        {editingTask ? (
          <Button onClick={handleSaveTask} colorScheme="teal">
            Save Task
          </Button>
        ) : (
          <Button onClick={handleAddTask} colorScheme="teal">
            Add Task
          </Button>
        )}
      </Stack>
      <List spacing={3} mt={6}>
        {filteredTasks.map((task) => (
          <ListItem
            key={task.id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg={task.completed ? "green.100" : "red.100"}
            p={2}
            borderRadius="md"
          >
            <Text
              as={task.completed ? "del" : "span"}
              onClick={() => dispatch(toggleTask(task.id))}
              cursor="pointer"
            >
              {task.text} - {task.category} - {task.dueDate} - {task.priority}
            </Text>
            <Button size="sm" onClick={() => handleEditTask(task)}>
              Edit
            </Button>
            <Button size="sm" onClick={() => dispatch(removeTask(task.id))}>
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskManager;
