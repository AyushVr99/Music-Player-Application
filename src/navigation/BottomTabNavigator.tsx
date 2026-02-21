import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabParamList } from './types';
import HomeStackNavigator from './HomeStackNavigator';
import ExploreScreen from '@screens/explore/ExploreScreen';
import ProfileScreen from '@screens/profile/ProfileScreen';
import NotFoundScreen from '@screens/common/NotFoundScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TAB_BAR_HEIGHT = 78;

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
        const isPlayer = routeName === 'Player';
        return {
          headerShown: false,
          tabBarActiveTintColor: '#F59E0B',
          tabBarInactiveTintColor: '#B8B8B8',
          tabBarStyle: isPlayer
            ? { display: 'none' }
            : {
                backgroundColor: '#FFFFFF',
                borderTopWidth: 1,
                borderTopColor: '#ECECEC',
                height: TAB_BAR_HEIGHT,
                paddingTop: 10,
                paddingBottom: 10,
                position: 'absolute',
                elevation: 0,
                shadowOpacity: 0,
              },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;
            if (route.name === 'HomeStack') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Playlists') {
              iconName = focused ? 'list' : 'list-outline';
            } else {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Ionicons name={iconName} size={size - 1} color={color} />;
          },
        };
      }}
    >
      <Tab.Screen name="HomeStack" component={HomeStackNavigator} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Favorites" component={ExploreScreen} />
      <Tab.Screen name="Playlists" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={NotFoundScreen} />
    </Tab.Navigator>
  );
}