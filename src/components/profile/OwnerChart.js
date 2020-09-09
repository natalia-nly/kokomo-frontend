import React from 'react'
//
import useChartConfig from 'hooks/useChartConfig'
import Box from 'components/Box'
import SyntaxHighlighter from 'components/SyntaxHighlighter'
import { Chart } from 'react-charts'

const OwnerChart = (props)  => {
  const { data} = useChartConfig({
    series: 10,
    dataType: 'ordinal'
  })
  const series = React.useMemo(
    () => ({
      type: 'bar'
    }),
    []
  )
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'left' },
      { position: 'bottom', type: 'linear', stacked: true }
    ],
    []
  )
  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <Box>
        <Chart data={data} series={series} axes={axes} tooltip />
      </Box>
      <br />
      <SyntaxHighlighter code={sourceCode} />
    </>
  )
}

export default OwnerChart;