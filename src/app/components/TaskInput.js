import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../features/tasks/tasksSlice'
import { Box, Button, Input, useToast } from '@chakra-ui/react'

function TaskInput() {
  const [task, setTask] = useState('')
  const dispatch = useDispatch()
  const toast = useToast()

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask({ id: Date.now(), text: task }))
      setTask('')
      toast({
        title: "Task added.",
        description: "Your task was added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Box display="flex" mb={4}>
      <Input
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button ml={2} onClick={handleAddTask}>Add Task</Button>
    </Box>
  )
}

export default TaskInput
