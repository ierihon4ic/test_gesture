/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    PanResponder,
    Animated
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MovedImage from "./Components/moveedImage";

const App = () => {

    return (
        <View style={styles.container}>
            <MovedImage/>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {

    },
    titleText: {
        fontSize: 28,
        lineHeight: 24,
        fontWeight: "bold"
    },
});

export default App;
