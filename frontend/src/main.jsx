import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Ensalamento from './pages/ensalamento/listagem/ensalamento';
import Professores from './pages/professores/listagem/professores';
import Turmas from './pages/turmas';
import CadastrarProfessores from './pages/professores/cadastro/cadastroProfessores';
import CadastrarTurmas from './pages/cadastroTurmas';
import Layout from './components/layout/layout';
import 'bootstrap/dist/css/bootstrap.min.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/professores',
        element: <Professores />,
      },
      {
        path: '/cadastrarProfessores',
        element: <CadastrarProfessores />,
      },
      {
        path: '/turmas',
        element: <Turmas />,
      },
      {
        path: '/cadastrarTurmas',
        element: <CadastrarTurmas />,
      },
      {
        path: '/ensalamento',
        element: <Ensalamento />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
