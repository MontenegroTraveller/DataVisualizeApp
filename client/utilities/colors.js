import * as d3 from 'd3'

export default (categories) => {
  const colors = d3
    .scaleLinear()
    .domain([1, categories.length / 4, categories.length / 2, categories.length])
    .range(['green', 'blue', 'yellow', 'red'])
  return categories.reduce(
    (acc, rec, index) => ({
      ...acc,
      [rec]: colors(index)
    }),
    {}
  )
}
