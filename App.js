import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
} from 'react-native';
import Constants from 'expo-constants';
import { colors } from './src/utils/Styles/colors';
import { Focus } from './src/features/Focus';
import { Timer } from './src/features/Timer';
import { FocusHistory } from './src/features/FocusHistory';

export default function App() {
    const [currentSubject, setCurrentSubject] = useState('');
    const [history, setHistory] = useState([]);

    return (
        <SafeAreaView style={styles.container}>
            {!currentSubject ? (
                <>
                    <Focus
                        addSubject={(text) => {
                            let id = history.length + 1;
                            let task = { text, id };
                            setCurrentSubject(task);
                        }}
                    />
                    <FocusHistory history={history} />
                </>
            ) : (
                <Timer
                    focusSubject={currentSubject}
                    onTimerEnd={(focusSubject) => {
                        setHistory([...history, focusSubject]);
                    }}
                    clearSubject={() => setCurrentSubject(null)}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: colors.bgDark,
    },
});
