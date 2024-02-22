import Navbar from "./Components/Navbar";
import Frontpage from "./Pages/Frontpage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style/index.css";
import MensClothing from "./Pages/MensClothing";
import WomensClothing from "./Pages/WomensClothing";
import Electronics from "./Pages/Electronics";
import Error from "./Pages/ErrorPage";
import Jewlery from "./Pages/Jewlery";
import Item from "./Pages/ItemPage";
import Signin from "./Pages/Signin";
import { AuthContextProvider } from "./contexts/AuthContext";

import RateSection from "./Components/NestedRoutes/RateSection";
import ProtectedRoute from "./Components/NestedRoutes/ProtectedRoute";
import { ModalProvider } from "./contexts/ModalContext";
import Signup from "./Pages/SignUp";
import { SearchProvider } from "./contexts/SearchContext";

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Frontpage />,
      },
      {
        path: "/:id",
        element: <Item />,
        children: [
          {
            path: "ratings",
            element: (
              <ProtectedRoute>
                <RateSection />
              </ProtectedRoute>
            ),
          },
        ],
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
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
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
      <AuthContextProvider>
        <SearchProvider>
          <ModalProvider>
            <RouterProvider router={router} />
          </ModalProvider>
        </SearchProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
