import Navbar from "./Components/Navbar";
import Frontpage from "./Pages/Frontpage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MensClothing from "./Pages/MensClothing";
import WomensClothing from "./Pages/WomensClothing";
import Electronics from "./Pages/Electronics";
import Error from "./Pages/ErrorPage";
import Jewlery from "./Pages/Jewlery";
import Item from "./Pages/ItemPage";

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/home",
        element: <Frontpage />,
      },
      {
        path: "/home/:id",
        element: <Item />,
      },
      {
        path: "/mensclothing",
        element: <MensClothing />,
      },
      {
        path: "/womensclothing",
        element: <WomensClothing />,
      },
      {
        path: "/electronics",
        element: <Electronics />,
      },
      {
        path: "/jewlery",
        element: <Jewlery />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
