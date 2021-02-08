import React, { useState, useEffect } from 'react'

const Dropdown = ({ title, items = [], handleSelect, param, defaultButton, checkboxView }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [selectedItem, setSelectedItem] = useState(
    typeof param === 'undefined' ? { value: title } : { value: param }
  )

  useEffect(() => {
    if (typeof param !== 'undefined') {
      setSelectedItem({ value: param })
    }
  }, [param])

  const toggleDropdown = (e) => {
    if (e.target.tagName !== 'I') {
      setIsOpenMenu(!isOpenMenu)
    }
  }

  const setDefault = () => {
    setSelectedItem({ value: title })
    handleSelect('')
    setIsOpenMenu(false)
  }

  function handleOnClick(item) {
    setSelectedItem(item)
    if (!checkboxView) {
      setIsOpenMenu(false)
    }

    if (checkboxView) {
      if (!param.includes(item.id)) {
        handleSelect(param.concat(item.id))
      } else handleSelect(param.filter((it) => it !== item.id))
    } else handleSelect(item.value)
  }

  const dropdownButtons = () => {
    if (defaultButton) {
      return selectedItem.value === title ? (
        <i
          className={`${
            isOpenMenu ? 'fa-angle-up' : 'fa-angle-down'
          } fas text-lg focus:outline-none`}
        />
      ) : (
        <i
          role="button"
          tabIndex={0}
          aria-label="Default Title DropDown"
          className="fas fa-times focus:outline-none text-sm"
          onKeyPress={setDefault}
          onClick={setDefault}
        />
      )
    }
    return (
      <i
        className={`${isOpenMenu ? 'fa-angle-up' : 'fa-angle-down'} fas text-lg focus:outline-none`}
      />
    )
  }

  const dropdownView = (item) => {
    if (checkboxView) {
      return (
        <label key={item.id} className="flex px-2" htmlFor="word-cloud">
          <div className="bg-transparent border rounded border-gray-700 w-4 h-4 flex justify-center items-center flex-shrink-0 mr-2">
            <input
              className="mr-1 opacity-0 absolute cursor-pointer"
              type="checkbox"
              value={item.value}
              checked={param.includes(item.id)}
              onChange={() => handleOnClick(item)}
            />
            <svg
              className={`${
                param.includes(item.id) ? 'block' : 'hidden'
              } fill-current w-2 h-2 text-gray-500 pointer-events-none`}
              viewBox="0 0 20 20"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          </div>
          <div
            className={`${param.includes(item.id) ? 'text-gray-500' : false} capitalize text-xs`}
          >
            {item.value ?? item.key}
          </div>
        </label>
      )
    }
    return (
      <li
        className={`${
          selectedItem.value === item.value ? 'text-gray-500' : null
        } text-xs px-2 hover:text-gray-500 `}
        key={item.id}
      >
        <button
          className="focus:outline-none capitalize w-full text-left"
          type="button"
          onClick={() => handleOnClick(item)}
        >
          {item.value ?? item.key}
        </button>
      </li>
    )
  }

  return (
    <div className="text-gray-700 w-40 md:w-48">
      <div
        className="focus:outline-none"
        tabIndex={0}
        role="button"
        onKeyPress={toggleDropdown}
        onClick={toggleDropdown}
      >
        {selectedItem.value !== title && !checkboxView && (
          <div className="text-xs uppercase px-2 align-bottom animated fadeInDown delay-1 faster">
            {title}
          </div>
        )}
        <div
          className="flex-row justify-between uppercase flex text-sm
            border-t border-b border-gray-700 px-2"
        >
          <div className="text-gray-500">
            {checkboxView ? title : selectedItem.value ?? selectedItem.id}
          </div>

          <div className="flex justify-center items-center w-4">{dropdownButtons()}</div>
        </div>
      </div>
      {isOpenMenu && (
        <ul className="animated fadeIn faster py-1 border-b border-gray-700">
          {items.map((item) => dropdownView(item))}
        </ul>
      )}
    </div>
  )
}

export default React.memo(Dropdown)
