import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, editTask } from "../tasksSlice";
import { useState } from "react";
import { Box, Button, Input, List, ListItem } from "@chakra-ui/react";

function TaskManager() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [taskText, setTaskText] = useState("");

  const handleAddTask = () => {
    dispatch(addTask({ id: Date.now(), text: taskText }));
    setTaskText("");
    alert("Task added successfully");
  };

  return (
    <Box>
      <Input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task"
      />
      <Button onClick={handleAddTask}>Add Task</Button>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            {task.text}
            <Button onClick={() => dispatch(deleteTask(task.id))}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default TaskManager;
