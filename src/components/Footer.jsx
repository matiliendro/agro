import React from 'react'

export default function Footer() {
  return (
    <footer className="fixed text-p-2 text-center bottom-0 left-0 ">
    © {new Date().getFullYear()} AgroMarket. Todos los derechos reservados.
  </footer>
  )
}