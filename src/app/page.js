// src/app/page.js
import Layout from "./layout";
import TaskManager from "../components/TaskManager";
import SplashScreen from "../components/SplashScreen";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000); // Show splash screen for 3 seconds
  }, []);

  return (
    <Layout>
      {loading ? <SplashScreen /> : <TaskManager />}
    </Layout>
  );
}
