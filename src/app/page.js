import { Provider } from "react-redux";
import store from "../redux/store";
import TaskManager from "../components/TaskManager";

export default function HomePage() {
  return (
    <Provider store={store}>
      <TaskManager />
    </Provider>
  );
}
