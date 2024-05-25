// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './features/tasks/tasksSlice'
import { loadState, saveState } from './utils/localStorage'

const preloadedState = loadState()

const store = configureStore({
  reducer: {
    tasks: tasksReducer
  },
  preloadedState
})

store.subscribe(() => {
  saveState(store.getState().tasks)
})

export default store
