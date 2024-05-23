import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/taskSlice";
import { Box, Select } from "@chakra-ui/react";

const TaskFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.tasks.filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilter({ [name]: value }));
  };

  return (
    <Box display="flex" justifyContent="space-between" mb={4}>
      <Select name="category" value={filters.category} onChange={handleChange}>
        <option value="All">All Categories</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Other">Other</option>
      </Select>
      <Select name="priority" value={filters.priority} onChange={handleChange}>
        <option value="All">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </Select>
      <Select name="status" value={filters.status} onChange={handleChange}>
        <option value="All">All Statuses</option>
        <option value="Completed">Completed</option>
        <option value="Incomplete">Incomplete</option>
      </Select>
    </Box>
  );
};

export default TaskFilter;
