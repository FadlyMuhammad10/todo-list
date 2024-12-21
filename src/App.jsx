import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import apiInstance from "./lib/axios";
import TaskPage from "./pages/project/task";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      const projects = apiInstance.get("/api/projects").then((res) => res.data);

      return projects;
    },
    element: <Home />,
  },
  {
    path: "/project/:id",
    loader: async ({ params }) => {
      const tasks = apiInstance
        .get(`/api/projects/${params.id}/tasks`)
        .then((res) => res.data);
      return tasks;
    },
    element: <TaskPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
