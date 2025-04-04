import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useHideOnScroll, HideDirection } from '@masumdev/rn-scroll-to-hide';
import { Ionicons } from '@expo/vector-icons'; // Pastikan Anda memiliki @expo/vector-icons

const TABBAR_HEIGHT = 70;
const HEADER_HEIGHT = 60;
const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

export default function ScrollToHideScreen() {
  const tabbar = useHideOnScroll({
    height: TABBAR_HEIGHT,
    duration: 300,
    threshold: 5,
    hideOnScrollDown: true,
    hideDirection: HideDirection.DOWN,
  });

  const header = useHideOnScroll({
    height: HEADER_HEIGHT,
    duration: 300,
    threshold: 5,
    hideOnScrollDown: true,
    hideDirection: HideDirection.UP,
  });

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    tabbar.onScroll(event);
    header.onScroll(event);
  };

  const renderDummyContent = () => {
    const items = [];
    for (let i = 1; i <= 50; i++) {
      items.push(
        <View key={i} style={styles.item}>
          <Text style={styles.itemText}>Item {i}</Text>
        </View>
      );
    }
    return items;
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, header.animatedStyle]}>
        <View style={styles.statusBar} />
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>App Title</Text>
        </View>
      </Animated.View>

      <ScrollView
        style={styles.content}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderDummyContent()}
      </ScrollView>

      <Animated.View style={[styles.tabbar, tabbar.animatedStyle]}>
        <View style={styles.tab}>
          <Ionicons name="home-outline" size={24} color="#5e72e4" />
          <Text style={styles.tabText}>Home</Text>
        </View>
        <View style={styles.tab}>
          <Ionicons name="search-outline" size={24} color="#5e72e4" />
          <Text style={styles.tabText}>Search</Text>
        </View>
        <View style={styles.tab}>
          <Ionicons name="person-outline" size={24} color="#5e72e4" />
          <Text style={styles.tabText}>Profile</Text>
        </View>
        <View style={styles.tab}>
          <Ionicons name="settings-outline" size={24} color="#5e72e4" />
          <Text style={styles.tabText}>Settings</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#5e72e4',
  },
  headerContent: {
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5e72e4',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    paddingTop: HEADER_HEIGHT + STATUSBAR_HEIGHT,
  },
  scrollContent: {
    paddingBottom: TABBAR_HEIGHT + 20,
  },
  item: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemText: {
    fontSize: 16,
  },
  tabbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TABBAR_HEIGHT,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#5e72e4',
    marginTop: 4,
  },
});
