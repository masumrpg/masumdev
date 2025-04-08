import { ScrollView, StyleSheet, View } from 'react-native';
import { QRCodeGenerator } from '@masumdev/rn-qrcode-pack';

const QRCodeGeneratorScreen = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Basic */}
        <QRCodeGenerator value="https://github.com/masumrpg" size={200} />
        {/* With Logo */}
        <QRCodeGenerator
          value="https://github.com/masumrpg"
          size={200}
          logo={{
            source: require('../../assets/logo.png'),
            size: 50,
            backgroundColor: 'white',
          }}
        />
      </View>
    </ScrollView>
  );
};

export default QRCodeGeneratorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 20,
  },
});
