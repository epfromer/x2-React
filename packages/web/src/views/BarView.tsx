import {
  clearSearch,
  getEmailAsync,
  selectCustodians,
  selectCustodiansLoading,
  selectEmailReceivers,
  selectEmailSenders,
  setFrom,
  setTo,
  store,
} from '@klonzo/common'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import BarChartJS from '../components/ChartJS/BarChartJS'
import BarECharts from '../components/ECharts/BarECharts'
import BarHighcarts from '../components/Highcharts/BarHighcharts'
import BarVictory from '../components/Victory/BarVictory'

export default function BarView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const custodiansLoading = useSelector(selectCustodiansLoading)
  const custodians = useSelector(selectCustodians)
  const emailSenders = useSelector(selectEmailSenders)
  const emailReceivers = useSelector(selectEmailReceivers)

  function handleClick(search: string, value: string) {
    dispatch(clearSearch())
    const name = value.slice(0, value.search(/,/))
    dispatch(search === 'from' ? setFrom(name) : setTo(name))
    getEmailAsync(store)
    history.push('/SearchView')
  }

  return (
    <div>
      {custodiansLoading && <LinearProgress />}
      {custodians && (
        <div>
          <Typography variant="h5">Victory</Typography>
          <BarVictory
            title="Senders"
            search="from"
            data={emailSenders}
            handleClick={handleClick}
          />
          <BarVictory
            title="Receivers"
            search="to"
            data={emailReceivers}
            handleClick={handleClick}
          />
          <Typography variant="h5">Highcharts</Typography>
          <BarHighcarts
            title="Senders"
            search="from"
            data={emailSenders}
            handleClick={handleClick}
          />
          <BarHighcarts
            title="Receivers"
            search="to"
            data={emailReceivers}
            handleClick={handleClick}
          />
          <Typography variant="h5">ChartJS</Typography>
          <BarChartJS
            title="Senders"
            search="from"
            data={emailSenders}
            handleClick={handleClick}
          />
          <BarChartJS
            title="Receivers"
            search="to"
            data={emailReceivers}
            handleClick={handleClick}
          />
          <Typography variant="h5">ECharts</Typography>
          <BarECharts
            title="Senders"
            search="from"
            data={emailSenders}
            handleClick={handleClick}
          />
          <BarECharts
            title="Receivers"
            search="to"
            data={emailReceivers}
            handleClick={handleClick}
          />
        </div>
      )}
      <button
        hidden
        onClick={() => handleClick('foo', 'to')}
        data-testid="handle-click"
      ></button>
    </div>
  )
}
