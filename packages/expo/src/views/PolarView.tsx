import {
  clearSearch,
  getEmailAsync,
  getCustodians,
  getCustodiansLoading,
  selectEmailReceivers,
  selectEmailSenders,
  setFrom,
  setTo,
  store,
} from '@klonzo/common'
import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Button, ThemeContext } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-native'
import ChartPicker from '../components/ChartPicker'
import PolarECharts from '../components/ECharts/PolarECharts'
import PolarVictory from '../components/Victory/PolarVictory'
import XmitTypePicker from '../components/XmitTypePicker'

export default function PolarView() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { theme }: any = useContext(ThemeContext)
  const [isSenders, setIsSenders] = useState(true)
  const [chartLib, setChartLib] = useState('ECharts')
  const custodiansLoading = useSelector(getCustodiansLoading)
  const custodians = useSelector(getCustodians)
  const emailSenders = useSelector(selectEmailSenders)
  const emailReceivers = useSelector(selectEmailReceivers)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
  })

  function handleClick(search: string, value: string) {
    dispatch(clearSearch())
    const name = value.slice(0, value.search(/,/))
    dispatch(search === 'from' ? setFrom(name) : setTo(name))
    getEmailAsync(store)
    history.push('/SearchView')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={custodiansLoading} textContent={'Loading...'} />
      {custodians && (
        <>
          {chartLib === 'ECharts' && (
            <>
              {isSenders && (
                <PolarECharts
                  title="Senders"
                  search="from"
                  data={emailSenders}
                  handleClick={handleClick}
                />
              )}
              {!isSenders && (
                <PolarECharts
                  title="Receivers"
                  search="to"
                  data={emailReceivers}
                  handleClick={handleClick}
                />
              )}
            </>
          )}
          {chartLib === 'Victory' && (
            <>
              {isSenders && (
                <PolarVictory
                  title="Senders"
                  search="from"
                  data={emailSenders}
                  handleClick={handleClick}
                />
              )}
              {!isSenders && (
                <PolarVictory
                  title="Receivers"
                  search="to"
                  data={emailReceivers}
                  handleClick={handleClick}
                />
              )}
            </>
          )}
        </>
      )}
      <XmitTypePicker onChange={(value) => setIsSenders(value === 'Senders')} />
      <ChartPicker
        onChange={(value) => setChartLib(value)}
        chartNames={['ECharts', 'Victory']}
      />
      {process.env.NODE_ENV === 'test' && (
        <Button
          onPress={() => handleClick('from', 'foo')}
          testID="test-click"
        />
      )}
    </SafeAreaView>
  )
}
