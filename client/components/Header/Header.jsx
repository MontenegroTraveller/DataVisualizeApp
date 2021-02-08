import React from 'react'

import Links from './Links'
import Settings from './Settings'
// import Logo from './Logo'

const Header = () => {
  return (
    <header className="flex flex-row justify-between relative mb-2">
      {/* <Logo /> */}
      <div className="w-1/2 md:w-64 border-b border-gray-700 text-gray-700">
        <Links />
      </div>
      <div className="flex justify-end w-1/2 md:w-64 border-b border-gray-700 text-gray-700">
        <Settings />
      </div>
    </header>
  )
}

Header.propTypes = {}

export default Header
