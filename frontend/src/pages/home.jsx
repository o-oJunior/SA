import React from 'react'
import { Link } from "react-router-dom"
export default function Home() {
  return (
    <div>
        <ul>
        <li><Link to="/professores">
            <button>Professores</button>
            </Link></li>
        <li>
        <Link to="/salas">
            <button>Salas</button>
            </Link>
        </li>
        <li>
        <Link to="/Ensalamento">
            <button>Ensalamento</button>
            </Link>
        </li>
        </ul>
    </div>
  )
}
