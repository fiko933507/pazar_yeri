import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import BaseMarketplace from './src/BaseMarketplace';
import FeatureHub from './src/FeatureHub';

export default function App() {
  const [showHub, setShowHub] = useState(false);
  return (
    <View style={styles.root}>
      <BaseMarketplace onOpenHub={() => setShowHub(true)} />
      <Modal visible={showHub} animationType="slide" onRequestClose={() => setShowHub(false)}>
        <FeatureHub onClose={() => setShowHub(false)} />
      </Modal>
    </View>
  );
}

const styles = { root: { flex: 1 } };
