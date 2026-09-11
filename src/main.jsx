import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";

import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Men from "./pages/Men.jsx";
import Women from "./pages/Women.jsx";
import Kids from "./pages/Kids.jsx";
import SingleProducts from "./pages/SingleProducts.jsx";
import Checkout from "./pages/Checkout.jsx";
import { ProductProvider } from "./context/ProductProvider.jsx";
// import ProductProvider from "./context/ProductProvider.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <Home />,
        // path:"/"
        index: true,
      },
      {
        element: <About />,
        path: "about",
      },
      {
        element: <Contact />,
        path: "contact",
      },
      {
        element: <Men />,
        path: "men",
      },
      {
        element: <Women />,
        path: "women",
      },
      {
        element: <Kids />,
        path: "kids",
      },
      {
        element: <SingleProducts />,
        path: "singleproduct/:id",
      },
      {
        element: <Checkout />,
        path: "checkout",
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ProductProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </ProductProvider>,
);
