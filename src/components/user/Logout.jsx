import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
export const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    navigate("/login");
  })
  return (
    <div>Cerrando sesion</div>
  )
}
