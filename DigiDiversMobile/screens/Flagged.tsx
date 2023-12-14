import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Flagged = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                You have been flagged for labelling too many pieces of data incorrectly.
                Depending on the severity of the offense, funds will be deducted from your payout
                and your avatar's experience will drop.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default Flagged;
