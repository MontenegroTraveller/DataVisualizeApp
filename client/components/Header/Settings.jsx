import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Search from './Search/Search'
import Share from './Share'

const Settings = () => {
  const { сharacterInfo } = useSelector((state) => state.data)

  const settingsIcons = ['fas fa-download']
  const [isSound, setIsSound] = useState(true)
  const [isSearch, setIsSearch] = useState(false)

  return (
    <div className="flex justify-end">
      <ul className="flex pt-1">
        <li className="pl-3">
          <button
            type="button"
            className="hover:text-gray-200 box-shadow-hover-2 focus:outline-none"
            onClick={() => setIsSound(!isSound)}
          >
            {isSound ? <i className="fas fa-volume-up" /> : <i className="fas fa-volume-mute" />}
          </button>
        </li>
        {settingsIcons.map((item) => (
          <li key={item} className="pl-3">
            <button
              type="button"
              className="hover:text-gray-200 box-shadow-hover-2 focus:outline-none "
            >
              <i className={item} />
            </button>
          </li>
        ))}
        <Share />
        <li className="pl-3">
          <button
            type="button"
            className="hover:text-gray-200 box-shadow-hover-2 focus:outline-none"
            onClick={() => setIsSearch(!isSearch)}
          >
            <i className="fas fa-search" />
          </button>
        </li>
        <li>
          {isSearch && !сharacterInfo.isShowing && (
            <Search isSearch={isSearch} setIsSearch={setIsSearch} />
          )}
        </li>
      </ul>
    </div>
  )
}

Settings.propTypes = {}

export default Settings
