import React from 'react'
import { useSelector } from 'react-redux'
import Dropdown from './Dropdown'

const ScatterByX = ({ setByXParam }) => {
  const scatterByX = useSelector((s) => s.categories.scatterByX)
  const items = scatterByX.map(({ key, title }) => ({
    id: key,
    value: title
  }))
  return (
    <Dropdown
      key="dropdown"
      title="X-AXIS VALUE"
      items={items}
      handleSelect={setByXParam}
      defaultButton
    />
  )
}

export default ScatterByX
