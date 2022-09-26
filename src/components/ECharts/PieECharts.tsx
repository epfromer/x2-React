import { useTheme } from '@mui/material/styles'
import ReactEcharts from 'echarts-for-react'
import { EmailXferedDatum, getPieEChartsConfig } from '../../common'

// https://echarts.apache.org/examples/en/index.html#chart-type-pie

const chartHeight = '600px'

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}
export default function PieECharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
  const theme = useTheme()
  const onClick = (e: any) => handleClick(search, e.name)

  return (
    <div>
      <ReactEcharts
        style={{ height: chartHeight }}
        onEvents={{ click: onClick }}
        option={getPieEChartsConfig(theme.palette.text.primary, title, data)}
      />
      <button hidden onClick={onClick} data-testid="pie-echarts"></button>
    </div>
  )
}
