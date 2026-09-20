import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BaseMarketplace from './src/BaseMarketplace';
import FeatureHub from './src/FeatureHub';

export default function App() {
  const [showHub, setShowHub] = useState(false);
  const [hubPage, setHubPage] = useState<'hub' | 'payment'>('hub');
  const openHub = (page: 'hub' | 'payment' = 'hub') => { setHubPage(page); setShowHub(true); };
  return (
    <SafeAreaProvider><View style={styles.root}>
      <BaseMarketplace onOpenHub={() => openHub('hub')} onOpenPayment={() => openHub('payment')} />
      <Modal visible={showHub} animationType="slide" onRequestClose={() => setShowHub(false)}>
        <FeatureHub key={hubPage} initialPage={hubPage} onClose={() => setShowHub(false)} />
      </Modal>
    </View></SafeAreaProvider>
  );
}

const styles = { root: { flex: 1 } };
