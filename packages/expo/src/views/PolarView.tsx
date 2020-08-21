import {
  clearSearch,
  getEmailAsync,
  selectContacts,
  selectContactsLoading,
  selectDarkMode,
  selectEmailReceivers,
  selectEmailSenders,
  setFrom,
  setTo,
} from '@klonzo/common'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import RNPickerSelect from 'react-native-picker-select'
import { useDispatch, useSelector } from 'react-redux'
import PolarECharts from '../components/ECharts/PolarECharts'
import PolarVictory from '../components/Victory/PolarVictory'

interface Props {
  route: any
  navigation: any
}
export default function PolarView({ navigation }: Props) {
  const dispatch = useDispatch()
  const darkMode = useSelector(selectDarkMode)
  const [isSenders, setIsSenders] = useState(true)
  const [chartLib, setChartLib] = useState('ECharts')
  const contactsLoading = useSelector(selectContactsLoading)
  const contacts = useSelector(selectContacts)
  const emailSenders = useSelector(selectEmailSenders)
  const emailReceivers = useSelector(selectEmailReceivers)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    picker: {
      height: 150,
    },
    itemStyle: {
      color: darkMode ? 'white' : 'black',
    },
  })

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: darkMode ? 'white' : 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: darkMode ? 'white' : 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  })

  function handleClick(search: string, value: string) {
    dispatch(clearSearch())
    dispatch(search === 'from' ? setFrom(`(${value})`) : setTo(`(${value})`))
    getEmailAsync()
    navigation.navigate('SearchView')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={contactsLoading} textContent={'Loading...'} />
      {contacts && (
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
      <RNPickerSelect
        value={isSenders ? 'Senders' : 'Receivers'}
        touchableWrapperProps={{ testID: 'xmit-picker' }}
        style={pickerSelectStyles}
        onValueChange={(value) => setIsSenders(value === 'Senders')}
        items={[
          { label: 'Senders', value: 'Senders' },
          { label: 'Receivers', value: 'Receivers' },
        ]}
      />
      <RNPickerSelect
        value={chartLib}
        touchableWrapperProps={{ testID: 'chartlib-picker' }}
        style={pickerSelectStyles}
        onValueChange={(value) => setChartLib(value)}
        items={[
          { label: 'ECharts', value: 'ECharts' },
          { label: 'Highcharts', value: 'Highcharts' },
          { label: 'Victory', value: 'Victory' },
        ]}
      />
    </SafeAreaView>
  )
}
