import React, { lazy, StrictMode, Suspense } from "react";
const Login = lazy(() => import("./pages/login/login"));
const Tags = lazy(() => import("./pages/tags/tags"));
const Layout = lazy(() => import("./pages/layout/layout"));
const QuestionList = lazy(() => import("./pages/questionList/questionList"));
const Test = lazy(() => import("./pages/test/test"));
const Map = lazy(() => import("./pages/map/map"));
import Skeleton from "@ant-design/pro-skeleton";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "tags",
        element: <Tags></Tags>,
      },
      {
        path: "QuestionList",
        element: <QuestionList></QuestionList>,
      },
      {
        path: "/test",
        element: <Test></Test>,
      },
      {
        path: "/map",
        element: <Map></Map>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);
export default function App() {
  return (
    <Suspense fallback={<Skeleton type="list"></Skeleton>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
