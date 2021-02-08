export const CATEGORIZE = 'tall&round/categories/CATEGORIZE'

const getDefaultMappings = (data, prefix = '') => {
  return Object.keys(data).reduce((acc, rec) => {
    let type = 'string'
    let value = data[rec]
    let multipleMappings = null
    if (typeof value === 'number') {
      type = 'number'
    } else if (value == null) {
      value = 'skip'
    } else if (Array.isArray(value)) {
      value = 'skip'
    } else if (typeof value === 'object') {
      multipleMappings = getDefaultMappings(value, `${rec}.`)
    } else if (value.length > 20) {
      type = 'unstrctured'
    }
    if (rec === 'id') {
      type = 'id'
    }
    if (multipleMappings !== null) {
      return {
        ...acc,
        ...Object.keys(multipleMappings).reduce((acc2, rec2) => {
          return { ...acc2, [`${prefix}${rec2}`]: multipleMappings[rec2] }
        }, {})
      }
    }
    return {
      ...acc,
      [`${prefix}${rec}`]: {
        name: rec.toUpperCase(),
        type
      }
    }
  }, {})
}
// Actions
export const categorize = (data, mappingsArg) => {
  let mappings = mappingsArg
  if (Object.keys(mappings).length === 0) {
    mappings = getDefaultMappings(data[0])
  }
  const sizeBy = Object.keys(mappings)
    .filter((it) => {
      return mappings[it].type === 'number'
    })
    .map((it) => ({
      key: it,
      title: mappings[it].title
    }))
  const colorBy = Object.keys(mappings)
    .filter((it) => {
      return typeof mappings[it].type === 'undefined' || mappings[it].type === 'string'
    })
    .map((it) => ({
      key: it,
      title: mappings[it].title
    }))
  const rankBy = Object.keys(mappings)
    .filter((it) => {
      return mappings[it].type === 'number' || mappings[it].type === 'string'
    })
    .map((it) => ({
      key: it,
      title: mappings[it].title
    }))
  const unstructuredType = Object.keys(mappings)
    .filter((it) => {
      return mappings[it].type === 'unstructured'
    })
    .map((it) => ({
      key: it,
      title: mappings[it].title
    }))
  const scatterByX = Object.keys(mappings)
    .filter((it) => {
      return typeof mappings[it].type === 'number' || mappings[it].type === 'string'
    })
    .map((it) => ({
      key: it,
      title: mappings[it].name
    }))
  const scatterByY = Object.keys(mappings)
    .filter((it) => {
      return typeof mappings[it].type === 'number' || mappings[it].type === 'string'
    })
    .map((it) => ({
      key: it,
      title: mappings[it].name
    }))
  const clusterBy = Object.keys(mappings)
    .filter((it) => {
      return mappings[it].type === 'string'
    })
    .map((it) => ({
      key: it,
      title: mappings[it].title
    }))

  return {
    type: CATEGORIZE,
    sizeBy,
    colorBy,
    unstructuredType,
    mappings,
    rankBy,
    scatterByX,
    scatterByY,
    clusterBy
  }
}
