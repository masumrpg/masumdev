import { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Fab, FabVariant } from '@masumdev/rn-fab';
import { BicepsFlexed, Plus } from 'lucide-react-native';

export default function FabScreen() {
  const [fabVariant, setFabVariant] = useState<FabVariant>('single');

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => setFabVariant('single')}
          style={styles.button}
        >
          <Text style={styles.text}>Single</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFabVariant('clustered')}
          style={styles.button}
        >
          <Text style={styles.text}>Clustered</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFabVariant('doted')}
          style={styles.button}
        >
          <Text style={styles.text}>Doted</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFabVariant('extended')}
          style={styles.button}
        >
          <Text style={styles.text}>Extended</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFabVariant('stacked')}
          style={styles.button}
        >
          <Text style={styles.text}>Stacked</Text>
        </TouchableOpacity>
      </ScrollView>

      {fabVariant === 'single' && (
        <Fab
          variant="single"
          component={<Plus size={30} color={'white'} />}
          onPress={() => console.log('Pressed')}
        />
      )}

      {fabVariant === 'clustered' && (
        <Fab
          variant="clustered"
          items={[
            {
              component: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
              label: 'Action 1',
            },
            {
              component: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
              label: 'Action 1',
            },
            {
              component: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
              label: 'Action 1',
            },
          ]}
        />
      )}

      {fabVariant === 'doted' && (
        <Fab
          variant="doted"
          items={[
            {
              component: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
            },
            {
              component: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
            },
            {
              component: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
            },
          ]}
        />
      )}

      {fabVariant === 'extended' && (
        <Fab
          variant="extended"
          items={[
            {
              component: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
              label: 'Action 1',
            },
            {
              component: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
              label: 'Action 1',
            },
            {
              component: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
              label: 'Action 1',
            },
          ]}
        />
      )}

      {fabVariant === 'stacked' && (
        <Fab
          variant="stacked"
          items={[
            {
              component: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
            },
            {
              component: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
            },
            {
              component: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
            },
          ]}
        />
      )}
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
    marginBottom: 10,
    backgroundColor: 'pink',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  }
});