/* eslint-disable no-console */
import React from 'react'
import { useLocation } from 'react-router-dom'

const TitlePage = () => {
  const { pathname } = useLocation()
  const headingPage = pathname
    .split(/[/_]/)
    .filter((it) => it !== '')
    .join(' ')

  return (
    <div className="flex-col">
      <div className="leading-none cursor-default select-none border-b border-gray-700 text-2xl md:text-3xl capitalize pb-1 md:pb-0">
        {headingPage}
      </div>
      <div className="items-end pt-1 text-xs text-gray-700 uppercase">{headingPage}</div>
    </div>
  )
}

TitlePage.propTypes = {}

export default TitlePage
