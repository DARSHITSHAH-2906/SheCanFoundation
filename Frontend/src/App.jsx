import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

import { useThemeStore } from './store'
import { useUserStore } from './store'

const App = () => {
  const { darkmode } = useThemeStore();
  const { isLoggedIn } = useUserStore();
  return (
    <div className={`min-h-screen bg-white ${darkmode ? "bg-gray-900 text-white" : " "} text-gray-900`}>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard"/> : <Login />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
      <ToastContainer position='left' autoClose={1000} />
    </div>
  )
}

export default App
