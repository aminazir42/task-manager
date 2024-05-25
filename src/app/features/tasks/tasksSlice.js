import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchTasks } from '../../api/mockApi'

export const loadTasks = createAsyncThunk('tasks/loadTasks', async () => {
  const response = await fetchTasks()
  return response
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ ...action.payload, completed: false })
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload)
      if (task) {
        task.completed = !task.completed
      }
    },
    editTask: (state, action) => {
      const { id, text } = action.payload
      const task = state.tasks.find(task => task.id === id)
      if (task) {
        task.text = text
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.tasks = action.payload
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { addTask, removeTask, toggleTaskCompletion, editTask } = tasksSlice.actions
export default tasksSlice.reducer
