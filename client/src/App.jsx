import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./_components/header/Header";
import Home from "./pages/home/Home";
import Footer from "./_components/footer/Footer";
import Services from "./pages/services/services";
import Service from "./pages/service/Service";
import Orders from "./pages/orders/Orders";
import MyServices from "./pages/myServices/MyServices";
import Add from "./pages/add/Add";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import Login from "./pages/login/Login";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Register from "./pages/register/Register";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Header />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/service/:id",
          element: <Service />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/myservices",
          element: <MyServices />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        { 
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
