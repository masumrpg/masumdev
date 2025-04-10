import { ScrollView, StyleSheet, View } from 'react-native';
import { QRCodeGenerator } from '@masumdev/rn-qrcode-pack';
import React from 'react';
import QRTitle from '../../../components/QRTitle';
// import * as FileSystem from 'expo-file-system';
// import { captureRef } from 'react-native-view-shot';

const QRCodeGeneratorScreen = () => {
  const qrSize = 250;
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
        <View>
          <QRTitle title="Basic Qr Code" />
          <QRCodeGenerator
            value="Basic Qr Code"
            size={qrSize}
            includeBackground
            // imageClip={{
            //   href: require('../../../assets/logo.png'),
            // }}
          />
        </View>

        {/* Heart */}
        <View>
          <QRTitle title="Heart Qr Code" />
          <QRCodeGenerator
            value="Heart Qr Code"
            size={qrSize}
            color="pink"
            eye={{
              topLeft: { shape: 'heart' },
              topRight: { shape: 'heart' },
              bottomLeft: { shape: 'heart' },
            }}
            piece={{
              shape: 'heart',
              size: 1,
            }}
            includeBackground
          />
        </View>

        {/* Dot */}
        <View>
          <QRTitle title="Dot Qr Code" />
          <QRCodeGenerator
            value="Heart Qr Code"
            size={qrSize}
            color="#483D8B"
            eye={{
              topLeft: { shape: 'dot' },
              topRight: { shape: 'dot' },
              bottomLeft: { shape: 'dot' },
            }}
            piece={{
              shape: 'dot',
              size: 1,
            }}
            includeBackground
          />
        </View>

        {/* With Logo */}
        <View>
          <QRTitle title="With Logo Qr Code" />

          <QRCodeGenerator
            ref={ref}
            value="With Logo Qr Code"
            size={qrSize}
            logo={{
              source: require('../../../assets/logo.png'),
              size: 50,
              backgroundColor: 'white',
              padding: 5,
              borderRadius: 99,
            }}
            version={3}
            piece={{
              shape: 'dot',
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

        {/* Rain Effect */}
        <View>
          <QRTitle title="Rain Qr Code" />
          <QRCodeGenerator
            value="Rain Qr Code"
            size={qrSize}
            color="#2074a7"
            version={2}
            eye={{
              topLeft: {
                shape: 'square',
                size: {
                  center: 1.2,
                  inner: 1.3,
                },
                radius: {
                  radiusOuter: 20,
                  radiusInner: 13,
                  radiusCenter: 10,
                },
              },
              topRight: {
                shape: 'square',
                size: {
                  center: 1.2,
                  inner: 1.3,
                },
                radius: {
                  radiusOuter: 20,
                  radiusInner: 13,
                  radiusCenter: 10,
                },
              },
              bottomLeft: {
                shape: 'square',
                size: {
                  center: 1.2,
                  inner: 1.3,
                },
                radius: {
                  radiusOuter: 20,
                  radiusInner: 13,
                  radiusCenter: 10,
                },
              },
            }}
            piece={{
              shape: 'rain',
              size: 1,
            }}
            includeBackground
          />
        </View>

        {/* Radial Gradient */}
        <View>
          <QRTitle title="Radial Gradient Qr Code" />
          <QRCodeGenerator
            value="Radial Gradient Qr Code"
            size={qrSize}
            includeBackground
            version={3}
            eye={{
              topRight: {
                shape: 'square',
                radius: {
                  radiusOuter: 20,
                  radiusInner: 13,
                  radiusCenter: 10,
                },
              },
              topLeft: {
                shape: 'square',
                radius: {
                  radiusOuter: 20,
                  radiusInner: 13,
                  radiusCenter: 10,
                },
              },
              bottomLeft: {
                shape: 'square',
                radius: {
                  radiusOuter: 20,
                  radiusInner: 13,
                  radiusCenter: 10,
                },
              },
            }}
            gradient={{
              type: 'radial',
              colors: [
                {
                  offset: '10%',
                  color: '#FFF242', // White center
                  opacity: 0.5,
                },
                {
                  offset: '100%',
                  color: '#228B22', // Forest green
                  opacity: 0.8,
                },
              ],
            }}
          />
        </View>

        {/* Radial Gradient */}
        <View>
          <QRTitle title="Radial Gradient Qr Code" />
          <QRCodeGenerator
            value="Radial Gradient Qr Code"
            size={qrSize}
            includeBackground
            version={3}
            eye={{
              topRight: {
                shape: 'square',
                radius: {
                  radiusOuter: 20,
                  radiusInner: 13,
                  radiusCenter: 10,
                },
              },
              topLeft: {
                shape: 'square',
                radius: {
                  radiusOuter: 20,
                  radiusInner: 13,
                  radiusCenter: 10,
                },
              },
              bottomLeft: {
                shape: 'square',
                radius: {
                  radiusOuter: 20,
                  radiusInner: 13,
                  radiusCenter: 10,
                },
              },
            }}
            gradient={{
              type: 'radial',
              colors: [
                {
                  offset: '10%',
                  color: '#FFF242', // White center
                  opacity: 0.5,
                },
                {
                  offset: '100%',
                  color: '#228B22', // Forest green
                  opacity: 0.8,
                },
              ],
            }}
          />
        </View>
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
