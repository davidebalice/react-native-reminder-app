import React from 'react';
import { View, StyleSheet } from 'react-native';

const Spacer = ({ height }) => {
  return <View style={[styles.spacer, { height: height }]} />;
};

const styles = StyleSheet.create({
  spacer: {
    height: 10,
  },
});

export default Spacer;
