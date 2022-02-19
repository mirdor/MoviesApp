import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Spinner = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color="lightgreen" size={80} />
    </View>
  );
};

export default Spinner;
