import { useBottomSheet } from '@masumdev/bottom-sheet';
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Button,
} from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { useToast } from '@masumdev/rn-toast';

export default function Index() {
  const [whatsNextYCoord, setWhatsNextYCoord] = useState<number>(0);
  const scrollViewRef = useRef<null | ScrollView>(null);
  const {expand,setSheetTitle,setContent,close} = useBottomSheet();
  const {showToast} = useToast()

  const openSheet = () => {
    setSheetTitle('What\'s next?');
    setContent(<Button title="Close" onPress={close}/>);
    expand();
    showToast("Bottom Sheet Opened", "success");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        ref={(ref) => {
          scrollViewRef.current = ref;
        }}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={styles.section}>
          <Button title="Open sheet" onPress={openSheet}/>
          <Text style={styles.textLg}>Hello there,</Text>
          <Text
            style={[styles.textXL, styles.appTitleText]}
            testID="heading"
            role="heading"
          >
            Welcome Masumdev 👋
          </Text>
        </View>
        <View style={styles.section}>
          <View style={styles.hero}>
            <View style={styles.heroTitle}>
              <Svg
                width={32}
                height={32}
                stroke="hsla(162, 47%, 50%, 1)"
                fill="none"
                viewBox="0 0 24 24"
              >
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </Svg>
              <Text style={[styles.textLg, styles.heroTitleText]}>
                You're up and running
              </Text>
            </View>
            <TouchableOpacity
              style={styles.whatsNextButton}
              onPress={() => {
                scrollViewRef.current?.scrollTo({
                  x: 0,
                  y: whatsNextYCoord,
                });
              }}
            >
              <Text style={[styles.textMd, styles.textCenter]}>What's next?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <View style={[styles.shadowBox]}>
            <Text style={[styles.marginBottomMd, styles.textLg]}>
              Learning materials
            </Text>
            <TouchableOpacity
              style={[styles.listItem, styles.learning]}
              onPress={() =>
                Linking.openURL(
                  'https://nx.dev/getting-started/intro?utm_source=nx-project'
                )
              }
            >
              <Text style={styles.textMd}>Documentation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  section: {
    padding: 24,
  },
  textXL: {
    fontSize: 48,
    fontWeight: '600',
  },
  textLg: {
    fontSize: 32,
    fontWeight: '600',
  },
  textMd: {
    fontSize: 18,
  },
  textCenter: {
    textAlign: 'center',
  },
  appTitleText: {
    paddingTop: 12,
    fontWeight: '500',
  },
  hero: {
    borderRadius: 12,
    backgroundColor: '#143055',
    padding: 36,
    marginBottom: 24,
  },
  heroTitle: {
    flex: 1,
    flexDirection: 'row',
  },
  heroTitleText: {
    color: '#ffffff',
    marginLeft: 12,
  },
  whatsNextButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 8,
    width: '50%',
    marginTop: 24,
  },
  learning: {
    marginTop: 12,
  },
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f2f3f5',
  },
  shadowBox: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 24,
  },
  marginBottomMd: {
    marginBottom: 24,
  },
});