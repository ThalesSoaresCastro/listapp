import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItemProvider } from './app/Contexts/ListItems';
import ListScreen from './app/Screens/ListScreen';

export default function App() {
  return (
    <ListItemProvider>
      <ListScreen />
    </ListItemProvider>
  );
}