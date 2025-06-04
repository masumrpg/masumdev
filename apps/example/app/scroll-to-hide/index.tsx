import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import Animated from 'react-native-reanimated';
// Pastikan path impor ini benar sesuai dengan struktur proyek Anda
// Jika rn-scroll-to-hide adalah library lokal di dalam 'libs'
// dan terekspos melalui package.json atau tsconfig paths,
// impornya mungkin seperti ini atau '@your-workspace/rn-scroll-to-hide'
import { useHideOnScroll, HideDirection } from '@masumdev/rn-scroll-to-hide';

const HEADER_HEIGHT =
  Platform.OS === 'ios' ? 80 : 60 + (StatusBar.currentHeight || 0);
const FOOTER_HEIGHT = 70;

const generateDummyData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i}`,
    text: `Item ${i + 1}`,
  }));
};

const ScrollToHideScreen = () => {
  const { animatedStyle: headerAnimatedStyle, onScroll: onScrollHeader } =
    useHideOnScroll({
      height: HEADER_HEIGHT,
      hideDirection: HideDirection.UP, // Sembunyikan header ke atas
      // Opsi tambahan bisa ditambahkan di sini jika perlu
      // duration: 250,
      // threshold: 15,
    });

  const { animatedStyle: footerAnimatedStyle, onScroll: onScrollFooter } =
    useHideOnScroll({
      height: FOOTER_HEIGHT,
      hideDirection: HideDirection.DOWN, // Sembunyikan footer ke bawah
      scrollDirection: 'down', // Sembunyikan footer hanya saat scroll ke bawah
    });

  // Menggabungkan event onScroll jika Anda memiliki satu ScrollView
  // yang mengontrol kedua elemen (header dan footer)
  const handleScroll = (event: any) => {
    onScrollHeader(event); // Panggil handler untuk header
    onScrollFooter(event); // Panggil handler untuk footer
  };

  const dummyData = generateDummyData(30);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />

      {/* Header */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <Text style={styles.headerText}>Scroll To Hide Header</Text>
      </Animated.View>

      {/* Konten Scroll */}
      <Animated.FlatList // Menggunakan Animated.FlatList untuk performa lebih baik dengan list besar
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.text}</Text>
          </View>
        )}
        onScroll={handleScroll} // Gunakan handler gabungan
        scrollEventThrottle={16} // Penting untuk animasi yang mulus
        contentContainerStyle={styles.scrollContentContainer}
        style={styles.scrollView}
      />

      {/* Footer */}
      <Animated.View style={[styles.footer, footerAnimatedStyle]}>
        <Text style={styles.footerText}>Sticky Footer</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: '#60A5FA', // Tailwind blue-400
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight, // Untuk notch/status bar
    borderBottomWidth: 1,
    borderBottomColor: '#3B82F6', // Tailwind blue-500
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingTop: HEADER_HEIGHT, // Memberi ruang untuk header yang fixed/absolute
    paddingBottom: FOOTER_HEIGHT, // Memberi ruang untuk footer
    paddingHorizontal: 16,
  },
  listItem: {
    backgroundColor: '#F3F4F6', // Tailwind gray-100
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB', // Tailwind gray-200
  },
  listItemText: {
    fontSize: 16,
    color: '#1F2937', // Tailwind gray-800
  },
  footer: {
    height: FOOTER_HEIGHT,
    backgroundColor: '#34D399', // Tailwind green-400
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderTopWidth: 1,
    borderTopColor: '#10B981', // Tailwind green-500
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default ScrollToHideScreen;
