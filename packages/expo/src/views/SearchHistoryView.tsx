import {
  getEmailAsync,
  getSearchHistoryAsync,
  searchHistoryExecute,
  selectSearchHistory,
  store,
  x2Server,
} from '@klonzo/common'
import { gql, request } from 'graphql-request'
import React, { useContext } from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button, ThemeContext } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-native'

export default function SearchHistoryView() {
  const history = useHistory()
  const { theme }: any = useContext(ThemeContext)
  const searchHistory = useSelector(selectSearchHistory)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    bold: {
      fontSize: 15,
      fontWeight: 'bold',
      color: theme.colors.black,
    },

    historyButton: {
      margin: 1,
      padding: 10,
    },
    itemContainer: {
      margin: 5,
    },
    spaceBetweenRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text: {
      color: theme.colors.black,
      marginBottom: 10,
    },
  })

  const onClearHistory = () => {
    const server = process.env.REACT_APP_X2_SERVER
      ? process.env.REACT_APP_X2_SERVER
      : x2Server
    const mutation = gql`
      mutation {
        clearSearchHistory
      }
    `
    request(`${server}/graphql/`, mutation)
      .then(() => getSearchHistoryAsync(store))
      .catch((e) => console.error(e))
  }

  const onSearchHistory = (entry: string) => {
    searchHistoryExecute(store, entry)
    getEmailAsync(store)
    history.push('/SearchView')
  }

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => onSearchHistory(item.entry)}>
      <View style={styles.itemContainer}>
        <View style={styles.spaceBetweenRow}>
          <Text numberOfLines={4} style={styles.text}>
            {item.timestamp.substring(0, 10)} {item.entry}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      {searchHistory && searchHistory.length !== 0 && (
        <FlatList
          data={searchHistory}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <Button
        buttonStyle={styles.historyButton}
        onPress={onClearHistory}
        testID="clear-history"
        title="Clear History"
      />
      {process.env.NODE_ENV === 'test' && (
        <Button
          onPress={() => onSearchHistory('{"to":"ba"}')}
          testID="test-click"
        />
      )}
    </SafeAreaView>
  )
}
