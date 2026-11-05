import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Navbar from './components/shared/Navbar'
import Login from '../src/components/auth/login'
import Signup from '../src/components/auth/signup'
import Home from './components/Home'
import { Toaster } from "sonner";
import{createBrowserRouter, RouterProvider, Route, Routes, Link} from 'react-router-dom'  

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home />
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"/signup",
    element:<Signup />
  }
])

export default function App() {
  return (
    <div>
      <Toaster position="top-right" richColors />

    <RouterProvider router={appRouter} />
    </div>
  )
}
