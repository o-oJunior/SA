import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Professores() {

  const [professores, setProfessores] = useState([])

  useEffect(() => {
    buscarProfessores()
  }, [])

  const buscarProfessores = async () => {
    try {
      const response = await fetch('https://api-ensalamento-senai.onrender.com/api/professores')
      const data = await response.json()
      setProfessores(data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(professores)
  return (
    <div>
      <div> Professores </div>
      <input placeholder='Pesquisar por Nome ou Matricula de Professor' />
      <Link to='/cadastrarProfessores'><button>Adicionar Professor</button></Link>

      {professores.map((professor) => {
        return <h5>{professor.nome}</h5>
})}
    </div>
  )
}
