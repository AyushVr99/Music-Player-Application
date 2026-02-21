import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeDetail'>;

const HomeDetailScreen = ({ route }: Props) => {
  const { id, title } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.id}>ID: {id}</Text>
    </View>
  );
};

export default HomeDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  id: {
    fontSize: 16,
    color: '#8E8E93',
  },
});
