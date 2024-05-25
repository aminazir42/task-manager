"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Heading } from '@chakra-ui/react';
import Layout from './layout';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { loadTasks } from './features/tasks/tasksSlice';

export default function Page() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  return (
    <Layout>
      <Box>
        <TaskInput />
        <TaskList />
      </Box>
    </Layout>
  );
}
