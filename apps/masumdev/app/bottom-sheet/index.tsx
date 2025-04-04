import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useBottomSheet } from '@masumdev/bottom-sheet';

export default function BottomSheetScreen() {
  const bottomSheet = useBottomSheet();

  const openBottomSheet = () => {
    bottomSheet.setSheetTitle('Welcome');
    bottomSheet.setContent(
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10,
          }}
        >
          Welcome to the Bottom Sheet
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>
          This is a dummy content for demonstration purposes.
        </Text>
      </View>
    );
    bottomSheet.expand('50%');
  };
  const openBottomSheetWitoutTitle = () => {
    bottomSheet.setContent(
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10,
          }}
        >
          No Title Here
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>
          This is another dummy content without a title.
        </Text>
      </View>
    );
    bottomSheet.expand('50%');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => openBottomSheet()}
        style={styles.greenButton}
      >
        <Text style={styles.buttonText}>Open</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => openBottomSheetWitoutTitle()}
        style={styles.blackButton}
      >
        <Text style={styles.buttonText}>Open Without Title</Text>
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
  greenButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  blackButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
