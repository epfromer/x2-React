import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/types'
// import AppSettingsView from '../views/AppSettingsView'
import BarView from '../views/BarView'
import ChordView from '../views/ChordView'
import DashboardView from '../views/DashboardView'
// import EmailDetailView from '../views/EmailDetailView'
// import EventTimelineView from '../views/EventTimelineView'
import NetworkGraphView from '../views/NetworkGraphView'
import PieView from '../views/PieView'
import PolarView from '../views/PolarView'
// import SearchView from '../views/SearchView'
import TreeMapView from '../views/TreeMapView'
// import VolumeTimelineView from '../views/VolumeTimelineView'
// import WordCloudView from '../views/WordCloudView'

const Drawer = createDrawerNavigator()

export default function RouteSwitch() {
  const darkMode = useSelector((state: RootState) => state.darkMode)

  return (
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Dashboard"
          component={DashboardView}
          options={{ title: 'Dashboard' }}
        />
        <Drawer.Screen
          name="PieView"
          component={PieView}
          options={{ title: 'Pie' }}
        />
        <Drawer.Screen
          name="BarView"
          component={BarView}
          options={{ title: 'Bar' }}
        />
        <Drawer.Screen
          name="ChordView"
          component={ChordView}
          options={{ title: 'Chord' }}
        />
        <Drawer.Screen
          name="NetworkGraphView"
          component={NetworkGraphView}
          options={{ title: 'Network Graph' }}
        />
        <Drawer.Screen
          name="PolarView"
          component={PolarView}
          options={{ title: 'Polar' }}
        />
        <Drawer.Screen
          name="TreeMapView"
          component={TreeMapView}
          options={{ title: 'Tree Map' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
