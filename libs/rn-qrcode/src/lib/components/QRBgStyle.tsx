import { StyleSheet, View } from 'react-native';

type Props = {
  children: React.ReactNode;
};

const QRBgStyle = ({ children }: Props) => {
  return <View style={styles.card}>{children}</View>;
};

export { QRBgStyle };

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 25,
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
