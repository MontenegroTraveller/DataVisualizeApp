import React from 'react'

const Preloader = () => {
  return (
    <div className="relative">
      <div className="spinner border-8 rounded-full w-64 h-64" />
      <div className="spinner-inner-circle absolute top-1/2 left-1/2 rounded-full bg-gray-700 w-56 h-56" />
      <div className="spinner-text absolute top-1/2 left-1/2 text-blue-1000-tallround font-semibold text-4xl">
        Loading
      </div>
    </div>
  )
}

Preloader.propTypes = {}

export default Preloader
