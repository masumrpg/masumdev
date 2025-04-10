import { ScrollView, StyleSheet, View } from 'react-native';
import { QRCodeGenerator } from '@masumdev/rn-qrcode-pack';
import React from 'react';
// import * as FileSystem from 'expo-file-system';
// import { captureRef } from 'react-native-view-shot';

const QRCodeGeneratorScreen = () => {
  const ref = React.useRef(null);

  // const handlePress = async () => {
  //   try {
  //     if (ref.current) {
  //       const uri = await captureRef(ref, {
  //         format: 'png',
  //         quality: 1,
  //       });

  //       if (Platform.OS === 'android') {
  //         const permissions =
  //           await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

  //         if (permissions.granted) {
  //           const base64 = await FileSystem.readAsStringAsync(uri, {
  //             encoding: FileSystem.EncodingType.Base64,
  //           });

  //           await FileSystem.StorageAccessFramework.createFileAsync(
  //             permissions.directoryUri,
  //             `qr-code-${Date.now()}`,
  //             'image/png'
  //           ).then(async (fileUri) => {
  //             await FileSystem.writeAsStringAsync(fileUri, base64, {
  //               encoding: FileSystem.EncodingType.Base64,
  //             });
  //             Alert.alert('Success', 'QR Code saved to Downloads!');
  //           });
  //         }
  //       } else {
  //         // iOS fallback
  //         const filename = `qr-code-${Date.now()}.png`;
  //         const filepath = `${FileSystem.documentDirectory}${filename}`;
  //         await FileSystem.copyAsync({ from: uri, to: filepath });
  //         Alert.alert('Success', `QR Code saved to app directory`);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Failed to save:', error);
  //     Alert.alert('Failed to save QR code');
  //   }
  // };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Basic */}
        <QRCodeGenerator
          value="https://github.com/masumrpg"
          size={200}
          includeBackground
          // imageClip={{
          //   href: require('../../../assets/logo.png'),
          // }}
        />

        {/* Dot */}
        <QRCodeGenerator
          value="https://github.com/masumrpg-dot"
          size={200}
          color="pink"
          eye={{
            topLeft: { shape: 'dot' },
            topRight: { shape: 'dot' },
            bottomLeft: { shape: 'dot' },
          }}
          piece={{
            shape: 'circle',
            size: 1,
          }}
          includeBackground
        />

        {/* With Logo */}
        <QRCodeGenerator
          ref={ref}
          value="https://github.com/masumrpg-with-logo"
          size={200}
          logo={{
            source: require('../../../assets/logo.png'),
            size: 50,
            backgroundColor: 'white',
            padding: 5,
            borderRadius: 99,
          }}
          eye={{
            topRight: {
              shape: 'circle',
              color: 'green',
              innerColor: 'black',
            },
            bottomLeft: {
              shape: 'circle',
              color: 'green',
              innerColor: 'black',
            },
            topLeft: {
              shape: 'circle',
              color: 'green',
              innerColor: 'black',
            },
          }}
          includeBackground
        />
      </View>
    </ScrollView>
  );
};

export default QRCodeGeneratorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 30,
  },
});
