import { EmailXferedDatum, getDarkMode } from '@klonzo/common'
import { useTheme } from '@material-ui/core/styles'
import {
  ArcElement,
  Chart,
  Legend,
  PieController,
  Title,
  Tooltip,
} from 'chart.js'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const chartHeight = '250'

Chart.register(ArcElement, PieController, Legend, Title, Tooltip)

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}
export default function PieChartJS({
  title,
  search,
  data,
  handleClick,
}: Props) {
  const chartContainer: any = useRef(null)
  const [getChartInstance, setChartInstance] = useState<any>(null)
  const darkMode = useSelector(getDarkMode)
  const theme = useTheme()

  const config: any = {
    type: 'pie',
    data: {
      labels: data.map((datum) => datum.name),
      datasets: [
        {
          data: data.map((datum) => datum.value),
          backgroundColor: data.map((datum) => datum.color),
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          padding: { top: 10 },
          font: { size: 26, color: theme.palette.text.primary },
          text: title,
        },
      },
      legend: {
        position: 'bottom',
        labels: {
          fontColor: theme.palette.text.primary,
        },
      },
      onClick: (e: any, item: any) => {
        if (item && item.length > 0) {
          handleClick(search, data[item[0]._index].name)
        }
      },
    },
  }

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      getChartInstance.destroy()
      const newChartInstance = new Chart(chartContainer.current, config)
      setChartInstance(newChartInstance)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartContainer, darkMode])

  return (
    <div>
      <canvas height={chartHeight} ref={chartContainer} />
    </div>
  )
}
