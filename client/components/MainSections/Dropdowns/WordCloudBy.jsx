import React from 'react'
import { useSelector } from 'react-redux'
import Dropdown from './Dropdown'

const WordCloudBy = ({ wordCloudParam, setWordCloudParam }) => {
  const wordCloud = useSelector((s) => s.categories.unstructuredType)
  const items = wordCloud.map(({ key, title }) => ({
    id: key,
    value: title
  }))

  return (
    <Dropdown
      title="word cloud by"
      items={items}
      handleSelect={setWordCloudParam}
      param={wordCloudParam}
      checkboxView
    />
  )
}

export default WordCloudBy
