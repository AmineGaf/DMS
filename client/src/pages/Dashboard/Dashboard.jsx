import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'


const Dashboard = () => {

  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div className={`h-screen ${darkMode ? 'bg-gray-950 text-gray-300' : ''}`}>
        hello
    </div>
  )
}

export default Dashboard