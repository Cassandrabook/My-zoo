import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AnimalDetail } from "./components/AnimalDetail/AnimalDetail";
import { Animals } from "./components/Animals/Animals";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Animals />
        },
        {
          path: "/animal/:id",
          element: <AnimalDetail />
        }
      ],
    },
  ]);