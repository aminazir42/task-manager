import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTask, toggleTaskCompletion, editTask } from '../features/tasks/tasksSlice'
import { Box, Button, Input, List, ListItem, Text } from '@chakra-ui/react'

function TaskList() {
  const tasks = useSelector((state) => state.tasks.tasks)
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(null)
  const [newText, setNewText] = useState('')

  const handleEdit = (task) => {
    setIsEditing(task.id)
    setNewText(task.text)
  }

  const handleSave = (id) => {
    dispatch(editTask({ id, text: newText }))
    setIsEditing(null)
  }

  return (
    <List spacing={3}>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bg={task.completed ? 'green.100' : 'red.100'}
          p={2}
          borderRadius="md"
        >
          {isEditing === task.id ? (
            <Input
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
          ) : (
            <Text
              as={task.completed ? 'del' : undefined}
              cursor="pointer"
              onClick={() => dispatch(toggleTaskCompletion(task.id))}
            >
              {task.text}
            </Text>
          )}
          <Box>
            {isEditing === task.id ? (
              <Button size="sm" colorScheme="blue" onClick={() => handleSave(task.id)}>
                Save
              </Button>
            ) : (
              <Button size="sm" colorScheme="blue" onClick={() => handleEdit(task)}>
                Edit
              </Button>
            )}
            <Button size="sm" colorScheme="red" ml={2} onClick={() => dispatch(removeTask(task.id))}>
              Delete
            </Button>
          </Box>
        </ListItem>
      ))}
    </List>
  )
}

export default TaskList
