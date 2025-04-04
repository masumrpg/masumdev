import { Text, View } from 'react-native';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useToast } from '@masumdev/rn-toast';

export default function ToastScreen() {
  const toast = useToast();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => toast.showToast('Info')}
        style={[styles.button, styles.blueButton]}
      >
        <Text style={styles.buttonText}>Info</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => toast.showToast('Success Toast', 'success')}
        style={[styles.button, styles.greenButton]}
      >
        <Text style={styles.buttonText}>Success</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => toast.showToast('Error Toast', 'error')}
        style={[styles.button, styles.redButton]}
      >
        <Text style={styles.buttonText}>Error</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: 150,
    alignItems: 'center',
  },
  blueButton: {
    backgroundColor: 'blue',
  },
  greenButton: {
    backgroundColor: 'green',
  },
  redButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
