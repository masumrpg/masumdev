import { StyleSheet, View } from 'react-native';

type Props = {
  children: React.ReactNode;
  width: number;
};

const QRBgStyle = ({ children, width }: Props) => {
  return (
    <View style={[styles.card, { width: width + 50, height: width + 50 }]}>
      {children}
    </View>
  );
};

export { QRBgStyle };

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
