import { NavigatorScreenParams } from '@react-navigation/native';

// Home Stack
export type HomeStackParamList = {
  Home: undefined;
  HomeDetail: { id: string; title: string };
  Player: undefined;
};

// Bottom Tabs
export type BottomTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  Favorites: undefined;
  Playlists: undefined;
  Settings: undefined;
};

// Root Navigator
export type RootStackParamList = {
  App: NavigatorScreenParams<BottomTabParamList>;
};