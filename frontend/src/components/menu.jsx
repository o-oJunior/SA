import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';
import logo from '../assets/logo.png';

export default function Menu() {
  return (
    <div className="teste">
      <aside className="menu-lateral">
        <img src={logo} className="logo" />

        <div className="div-lista">
          <ul className="lista-botoes">
            <li>
              <Link to="/professores">
                <button className="botao-lista">Professores</button>
              </Link>
            </li>

            <li>
              <Link to="/turmas">
                <button className="botao-lista">Turmas</button>
              </Link>
            </li>

            <li>
              <Link to="/Ensalamento">
                <button className="botao-lista btn-ensalamento">Ensalamento</button>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
