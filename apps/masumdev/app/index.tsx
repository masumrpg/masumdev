import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Link } from 'expo-router';
import {
  AlignVerticalJustifyEnd,
  Bell,
  GalleryHorizontal,
} from 'lucide-react-native';

export default function HomeScreen() {
  const listLibrary = [
    {
      id: 1,
      title: 'Rn Toast',
      path: '/toast',
      icon: <Bell size={30} color={'black'} />,
    },
    {
      id: 2,
      title: 'Bottom Sheet',
      path: '/bottom-sheet',
      icon: <AlignVerticalJustifyEnd size={30} color={'black'} />,
    },
    {
      id: 3,
      title: 'Rn Scroll To Hide',
      path: '/scroll-to-hide',
      icon: <GalleryHorizontal size={30} color={'black'} />,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {listLibrary.map((item) => (
          <Link href={item.path} key={item.id} asChild>
            <TouchableOpacity style={styles.gridItem}>
              {item.icon}
              <Text style={styles.gridItemText}>{item.title}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: Dimensions.get('window').width / 2 - 24,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridItemText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});
