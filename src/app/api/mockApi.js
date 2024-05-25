const tasks = [
    { id: 1, text: 'Learn Next.js', completed: false },
    { id: 2, text: 'Build a task manager', completed: true },
  ];
  
  export const fetchTasks = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(tasks);
      }, 500);
    });
  };
  