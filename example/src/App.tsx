import React, { useEffect, useState } from 'react';

import { StyleSheet, View, Text, Image } from 'react-native';
import ReceiveShareIntent from 'react-native-receive-share-intent';

const handleFileUrl = (url: string) => {
  if (url.startsWith('file://')) {
    return url;
  }
  if (url.startsWith('content://')) {
    return url;
  }
  if (url.startsWith('data:')) {
    return url;
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return 'file://' + url;
};

export default function App() {
  const [image, setImage] = useState<string>('');
  useEffect(() => {
    ReceiveShareIntent.getReceivedFiles(
      (data: any) => {
        console.log(data);
        setImage(handleFileUrl(data[0].filePath));
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
      <Text>Image:</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}
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
  image: {
    width: 200,
    height: 200,
  },
});
