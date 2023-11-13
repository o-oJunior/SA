import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/home'
import Ensalamento from './pages/ensalamento'
import Professores from './pages/professores'
import Salas from './pages/salas'
import Turmas from './pages/turmas'
import CadastrarProfessores from './pages/cadastroProfessores'
import CadastrarTurmas from './pages/cadastroTurmas'
import CadastrarSalas from './pages/cadastroSalas'


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
    path: "/cadastrarProfessores",
    element: <CadastrarProfessores />
  },
  {
    path: "/salas",
    element: <Salas />
  },
  {
    path: "/cadastrarSalas",
    element: <CadastrarSalas />
  },
  {
    path: "/turmas",
    element: <Turmas />
  },
  {
    path: "/cadastrarTurmas",
    element: <CadastrarTurmas />
  },
  {
    path: "/ensalamento",
    element: <Ensalamento />
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
