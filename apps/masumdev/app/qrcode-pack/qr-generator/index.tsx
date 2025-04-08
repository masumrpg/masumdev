import { StyleSheet, View } from 'react-native';
import { QRCodeGenerator } from '@masumdev/rn-qrcode-pack';

const QRCodeGeneratorScreen = () => {
  return (
    <View style={styles.container}>
      <QRCodeGenerator
        gradient={{
          type: 'linear',
          stops: [
            // { offset: '66%', color: '#3388ff' }, // soft blue
            { offset: '100%', color: '#6a00ff' }, // purple finish
            // { offset: '0%', color: '#ff6b6b' }, // soft red
            { offset: '33%', color: '#51e980' }, // fresh green
          ],
          direction: 'to-top',
          maskLogo: true,
        }}
        value="https://github.com/masumdev"
        size={300}
        // color="#000000"
        backgroundColor="#ffffff"
        logo={{
          source: require('../../../assets/icon.png'),
          size: 0.2, // 20% dari ukuran QR
          backgroundColor: '#ffffff',
          borderRadius: 16,
          borderColor: '#000000',
          borderWidth: 4,
          padding: 8,
        }}
        // piece={{
        //   shape: 'rounded',
        //   color: '#000000',
        //   size: 1,
        //   borderRadius: 4,
        // }}
        // eye={{
        //   topLeft: {
        //     shape: 'square',
        //     color: '#000000',
        //     radiusOuter: 8,
        //     radiusInner: 4,
        //   },
        //   topRight: {
        //     shape: 'square',
        //     color: '#000000',
        //     radiusOuter: 8,
        //     radiusInner: 4,
        //   },
        //   bottomLeft: {
        //     shape: 'square',
        //     color: '#000000',
        //     radiusOuter: 8,
        //     radiusInner: 4,
        //   },
        // }}
      />
    </View>
  );
};

export default QRCodeGeneratorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
