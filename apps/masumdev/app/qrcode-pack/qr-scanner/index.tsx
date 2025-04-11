import {
  OnSuccessfulScanProps,
  QRCodeScanner,
  QRCodeValidator,
} from '@masumdev/rn-qrcode-pack';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const QRCodeScannerScreen = () => {
  const [scannedMember, setScannedMember] = useState<string | null>(null);

  const handleSuccessfulScan = (data: OnSuccessfulScanProps) => {
    if (data.code) {
      setScannedMember(data.code);
    }
    console.log(data);
  };

  const validateQRCode: QRCodeValidator = (code: string) => {
    // Example: Only accept URLs starting with https://
    // if (code.startsWith('https://')) {
    //   return { valid: true, code };
    // }

    // // Example: Accept product codes with specific format
    // if (/^PROD-\d{6}$/.test(code)) {
    //   return { valid: true, code };
    // }

    if (code) {
      return { valid: true, code, message: 'Success' };
    }

    return {
      valid: false,
      message:
        'Invalid QR code format. Expected HTTPS URL or product code (PROD-XXXXXX).',
    };
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <QRCodeScanner
        // Core functionality
        core={{
          onSuccessfulScan: handleSuccessfulScan,
          validate: validateQRCode,
        }}
        // Scanning behavior
        scanning={{
          cooldownDuration: 3000,
          scanningArea: {
            // tolerance: 80,∂
          },
        }}
        // UI Controls
        uiControls={{
          showControls: true,
          showStatus: true,
          showTorchButton: false, // We're using custom controls
        }}
        // Appearance
        appearance={{
          theme: 'light',
          overlayStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            opacity: 0.9,
          },
          frameStyle: {
            width: 280,
            height: 280,
            borderRadius: 20,
          },
          cornerStyle: {
            color: '#00AAFF',
            width: 4,
            length: 30,
          },
          statusStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            textColor: '#FFFFFF',
            borderRadius: 12,
            padding: 10,
            fontWeight: '600',
          },
        }}
      />

      {scannedMember && (
        <View style={styles.bottomContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.memberText}>{scannedMember}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  infoContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  memberText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default QRCodeScannerScreen;
