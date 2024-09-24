import { StyleSheet } from 'react-native';

import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

type moveOptions = 'rock' | 'paper' | 'scissor' | null;

export default function HomeScreen() {
  const [moveSelected, setMoveSelected] = useState<moveOptions>(null);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Choose your move</ThemedText>
      </ThemedView>
      <ThemedView style={styles.section}>
        <Button color={moveSelected === 'rock' ? '#051937' : undefined} title="✊ Rock" onPress={() => setMoveSelected('rock')} />
        <Button color={moveSelected === 'paper' ? '#051937' : undefined} title="👋 Paper" onPress={() => setMoveSelected('paper')} />
        <Button color={moveSelected === 'scissor' ? '#051937' : undefined} title="✌️ Scissor" onPress={() => setMoveSelected('scissor')} />
      </ThemedView>
      <ThemedView style={styles.confirmSection}>
        <Button title="Confirm" onPress={() => { }} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 64
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
  },
  section: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    gap: 8
  },
  confirmSection: {},
  selectedButton: {
    backgroundColor: '#051937'
  },
  button: {},
});
