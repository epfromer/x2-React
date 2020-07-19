import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ECharts } from 'react-native-echarts-wrapper'
import { useSelector } from 'react-redux'
import { EmailXferedDatum, RootState } from '../../store/types'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// https://echarts.apache.org/examples/en/index.html#chart-type-bar
// TODO fix y axis lable truncation
// TODO fix click handler

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (key: string, value: string) => void
}

export default function BarECharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
  const darkMode = useSelector((state: RootState) => state.darkMode)

  interface Datum {
    value: number
    name: string
    itemStyle: any
  }
  const chartData: Array<Datum> = []
  data.forEach((datum) => {
    chartData.push({
      name: datum.name,
      value: datum.value,
      itemStyle: {
        normal: {
          color: datum.color,
          lineStyle: {
            color: datum.color,
          },
          areaStyle: {
            color: datum.color,
          },
        },
      },
    })
  })

  chartData.reverse()

  function onData(name: string) {
    console.log(name)
    // data[0].handleClick(search, name)
  }

  return (
    <ECharts
      onData={onData}
      additionalCode={`chart.on('click', p => sendData(p.data));`}
      option={{
        title: {
          text: title,
          top: 20,
          left: 'center',
          textStyle: {
            color: darkMode ? 'white' : 'black',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: 100,
        },
        xAxis: {
          axisLabel: {
            color: darkMode ? 'white' : 'black',
          },
        },
        yAxis: {
          data: chartData.map((datum) => datum.name),
          axisLabel: {
            color: darkMode ? 'white' : 'black',
          },
        },
        series: [
          {
            type: 'bar',
            data: chartData,
          },
        ],
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
})
