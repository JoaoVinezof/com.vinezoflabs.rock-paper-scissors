import { StyleSheet } from 'react-native';

import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Rock, Paper, Scissors</ThemedText>
        <ThemedText type="subtitle">Select game mode</ThemedText>
      </ThemedView>
      <ThemedView style={styles.section}>
        <Button title="Offline mode" onPress={() => {}} />
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
});
