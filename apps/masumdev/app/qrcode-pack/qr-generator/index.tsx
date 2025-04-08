import { StyleSheet, View } from 'react-native'
import { QRCode, QRCodeGenerator } from '@masumdev/rn-qrcode-pack';

const QRCodeGeneratorScreen = () => {
  return (
    <View style={styles.container}>
      <QRCode
        value="https://github.com/masumdev"
        size={300}
        color="#000000"
        backgroundColor="#ffffff"
        logo={{
          source:
            'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
          size: 0.2, // 20% dari ukuran QR
          backgroundColor: '#ffffff',
          borderRadius: 16,
          borderColor: '#000000',
          borderWidth: 4,
          padding: 8,
        }}
        piece={{
          shape: 'rounded',
          color: '#000000',
          size: 1,
          borderRadius: 4,
        }}
        eye={{
          topLeft: {
            shape: 'square',
            color: '#000000',
            radiusOuter: 8,
            radiusInner: 4,
          },
          topRight: {
            shape: 'square',
            color: '#000000',
            radiusOuter: 8,
            radiusInner: 4,
          },
          bottomLeft: {
            shape: 'square',
            color: '#000000',
            radiusOuter: 8,
            radiusInner: 4,
          },
        }}
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
})