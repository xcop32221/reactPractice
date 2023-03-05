import React, { lazy, StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import "./mock/index.js"

const Login=lazy(()=>import('./pages/login/login'))
const Tags=lazy(()=>import('./pages/tags/tags'))
const Layout=lazy(()=>import('./pages/layout/layout'))
const QuestionList=lazy(()=>import('./pages/questionList/questionList'))
const Test=lazy(()=>import('./pages/test/test'))
import Skeleton from '@ant-design/pro-skeleton';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{
      path: 'tags',
      element: <Tags></Tags>
    },{
      path:'QuestionList',
      element:<QuestionList></QuestionList>
    },
    {
      path:'/test',
      element:<Test></Test>
    }]
  },
  {
    path: "/login",
    element:<Login></Login>
  },
 
]);
ReactDOM.createRoot(document.getElementById('root')).render(

    <Suspense fallback={<Skeleton type="list"></Skeleton>}>
        <RouterProvider router={router} />
    </Suspense>
  
    

)
