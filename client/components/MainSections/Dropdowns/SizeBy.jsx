import React from 'react'
import { useSelector } from 'react-redux'
import Dropdown from './Dropdown'

const SizeBy = ({ setSizeByParam, sizeByParam }) => {
  const sizeBy = useSelector((s) => s.categories.sizeBy)
  const items = sizeBy.map(({ key, title }) => ({
    id: key,
    value: title ?? key
  }))

  return (
    <Dropdown title="size by" items={items} handleSelect={setSizeByParam} param={sizeByParam} />
  )
}

export default SizeBy
