import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { router } from 'expo-router';

const QRCodePackScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'pink' }]}
        onPress={() => router.push('/qrcode-pack/qr-generator')}
      >
        <Text style={styles.text}>QRCode Generator</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'orange' }]}
        onPress={() => router.push('/qrcode-pack/qr-scanner')}
      >
        <Text style={styles.text}>QRCode Scanner</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QRCodePackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 20,
  },
  button: {
    padding: 20,
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});
