import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AnimalDetail } from "./components/AnimalDetail/AnimalDetail";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/animal/:id",
          element: <AnimalDetail />
        }
      ],
    },
  ]);