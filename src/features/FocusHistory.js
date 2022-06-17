import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../utils/Styles/colors';
import { fontSizes, spacing } from '../utils/Styles/sizes';

export const FocusHistory = ({ history }) => {
  if (!history || !history.length)
    return (
      <View style={styles.container}>
        <Text style={styles.title}> We haven't focused on anything yet </Text>
      </View>
    );

  const renderItem = ({ item }) => <Text style={styles.item}>- {item}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Things we've focused on: </Text>
      <FlatList data={history} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    flex: 1,
  },
  item: {
    color: colors.contrastDark,
    fontSize: fontSizes.md,
    padding: spacing.sm,
  },
  title: {
    color: colors.contrastDark,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
  },
});
