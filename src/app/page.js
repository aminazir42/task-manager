'use client';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, toggleTask, deleteTask, updateTask } from './store/tasksSlice';
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  useColorMode,
  FormControl,
  FormLabel,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

export default function Home() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [taskText, setTaskText] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);

  const handleAddTask = () => {
    if (taskText.trim() !== '') {
      dispatch(addTask({ text: taskText, category: taskCategory, dueDate: taskDueDate, completed: false }));
      setTaskText('');
      setTaskCategory('');
      setTaskDueDate('');
    }
  };

  const handleEditTask = (task) => {
    setTaskText(task.text);
    setTaskCategory(task.category);
    setTaskDueDate(task.dueDate);
    setEditTaskId(task.id);
    onOpen();
  };

  const handleUpdateTask = () => {
    if (editTaskId !== null) {
      dispatch(updateTask({ id: editTaskId, text: taskText, category: taskCategory, dueDate: taskDueDate }));
      setTaskText('');
      setTaskCategory('');
      setTaskDueDate('');
      setEditTaskId(null);
      onClose();
    }
  };

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="2xl" mb={6}>
        Task Manager
      </Heading>
      <Button onClick={toggleColorMode} mb={6}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
      <Box mb={6}>
        <FormControl mb={4}>
          <Input
            placeholder="Add a new task"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Category</FormLabel>
          <Select placeholder="Select category" value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)}>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Others">Others</option>
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Due Date</FormLabel>
          <Input type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} />
        </FormControl>
        <Button onClick={handleAddTask} colorScheme="teal">
          Add Task
        </Button>
      </Box>
      <Stack spacing={4}>
        {tasks.map((task) => (
          <Box
            key={task.id}
            p={4}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            bg={task.completed ? 'green.100' : 'white'}
            cursor="pointer"
            textDecoration={task.completed ? 'line-through' : 'none'}
            onClick={() => dispatch(toggleTask(task.id))}
          >
            <Text>{task.text}</Text>
            <Text>Category: {task.category}</Text>
            <Text>Due Date: {task.dueDate}</Text>
            <Button size="sm" colorScheme="yellow" onClick={(e) => {
              e.stopPropagation();
              handleEditTask(task);
            }}>
              Edit
            </Button>
            <Button size="sm" colorScheme="red" onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteTask(task.id));
            }}>
              Delete
            </Button>
          </Box>
        ))}
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Task</FormLabel>
              <Input
                placeholder="Edit task"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Category</FormLabel>
              <Select value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)}>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Others">Others</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Due Date</FormLabel>
              <Input type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleUpdateTask}>
              Update Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
