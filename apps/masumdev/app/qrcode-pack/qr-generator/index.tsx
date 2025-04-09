import { ScrollView, StyleSheet, View } from 'react-native';
import { LogoSvg } from '../../../components/LogoSvg';
import { QRCodeGenerator } from '@masumdev/rn-qrcode-pack';

const QRCodeGeneratorScreen = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Basic */}
        <QRCodeGenerator
          value="https://github.com/masumrpg"
          size={200}
          includeBackground
          version={3}
          image={{
            source: <LogoSvg />,
          }}
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
