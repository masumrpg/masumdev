import { StyleSheet, View } from 'react-native'
import { QRCodeGenerator } from '@masumdev/rn-qrcode-pack';

const QRCodeGeneratorScreen = () => {
  return (
    <View style={styles.container}>
      <QRCodeGenerator value='Kudaliar' />
    </View>
  )
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