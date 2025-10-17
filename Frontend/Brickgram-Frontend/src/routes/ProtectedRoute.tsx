import React from 'react'
import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
  children: React.ReactNode
}

function ProtectedRoute({children} : ProtectedRouteProps) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token")
    if (!token) { return <Navigate to="/login" replace/> }
  return (
    <>{children}</>
  )
}

export default ProtectedRoute