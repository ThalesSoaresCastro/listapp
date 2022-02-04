import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItemProvider } from './app/Contexts/ListItems';
import ListScreen from './app/Screens/ListScreen';

export default function App() {
  return (
    <ListItemProvider>
      <StatusBar style="auto" />
      <ListScreen />
    </ListItemProvider>
  );
}