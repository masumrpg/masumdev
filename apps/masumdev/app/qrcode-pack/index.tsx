import { StyleSheet, View } from 'react-native'
import { QRCodeGenerator } from '@masumdev/rn-qrcode-pack';

const QRCodePackScreen = () => {
  return (
    <View style={styles.container}>
      <QRCodeGenerator value='Kudaliar' />
    </View>
  )
};

export default QRCodePackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})