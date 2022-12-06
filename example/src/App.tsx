import React, { useEffect } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import ReceiveShareIntent from 'react-native-receive-share-intent';

export default function App() {
  useEffect(() => {
    ReceiveShareIntent.getReceivedFiles(
      (data: any) => {
        console.log('getReceivedFiles', data);
      },
      (err: any) => {
        console.log(err);
      }
    );

    return () => {
      ReceiveShareIntent.clearReceivedFiles();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result:</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
