import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/home'
import Ensalamento from './pages/ensalamento'
import Professores from './pages/professores'
import Salas from './pages/salas'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/professores",
    element: <Professores />
  },
  {
    path: "/salas",
    element: <Salas />
  },
  {
    path: "/ensalamento",
    element: <Ensalamento />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
