import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { Countdown } from '../components/CountDown';
import { RoundedButton } from '../components/RoundedButton';
import { Timing } from './Timing';
import { colors } from '../utils/Styles/colors';
import { spacing } from '../utils/Styles/sizes';

const ONE_SECOND_IN_MS = 1000;
const PATTERN = [
  0.1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  0.5 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  0.5 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject)
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          onProgress={setProgress}
          onEnd={onEnd}
          isPaused={!isStarted}
          minutes={minutes}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.subTitle}>{focusSubject}</Text>
        </View>
      </View>
      <View style={styles.progressWrapper}>
        <ProgressBar
          style={styles.progressBar}
          color={colors.secondaryDark}
          progress={progress}
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
        {isStarted && (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={50} title="-" onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    paddingTop: spacing.xxl,
  },
  subTitle: {
    color: colors.contrastDark,
    textAlign: 'center',
  },
  progressWrapper: {
    paddingTop: spacing.sm,
  },
  progressBar: {
    height: spacing.sm,
  },
  title: {
    color: colors.contrastDark,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    paddingTop: spacing.xxl,
    flexDirection: 'row',
  },
  buttonWrapper: {
    flex: 0.3,
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'end',
  },
});
