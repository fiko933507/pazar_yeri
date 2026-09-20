import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BaseMarketplace from './src/BaseMarketplace';
import FeatureHub from './src/FeatureHub';

export default function App() {
  const [showHub, setShowHub] = useState(false);
  return (
    <View style={styles.root}>
      <BaseMarketplace />
      <Pressable style={styles.launcher} onPress={() => setShowHub(true)}>
        <Ionicons name="sparkles" size={20} color="white" />
        <Text style={styles.launcherText}>PAZAR+</Text>
      </Pressable>
      <Modal visible={showHub} animationType="slide" onRequestClose={() => setShowHub(false)}>
        <FeatureHub onClose={() => setShowHub(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  launcher: {
    position: 'absolute', right: 14, bottom: 88, height: 48, borderRadius: 24,
    backgroundColor: '#123FBB', paddingHorizontal: 16, flexDirection: 'row',
    alignItems: 'center', gap: 7, borderWidth: 3, borderColor: 'white',
    shadowColor: '#102044', shadowOpacity: 0.22, shadowRadius: 8, elevation: 7,
  },
  launcherText: { color: 'white', fontWeight: '900', fontSize: 12 },
});
