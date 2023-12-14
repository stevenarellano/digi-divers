import React, { useEffect } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useRecoilValue } from 'recoil';
import { walletState } from '../context';
import { THEME } from '../styles';


const Returning = ({ navigation }: any) => {
    const wallet = useRecoilValue(walletState);

    useEffect(() => {
        // handle for if users wallet is not logged in

    }, [navigation]);

    const handleSubmit = async () => {

        navigation.navigate('Labeling');
    };


    return (
        <View style={styles.container}>
            <Text style={styles.welcomeBanner}>Welcome back!</Text>
            <Text style={styles.subtitle}>Click "Start" to start labeling</Text>

            <Pressable style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Start</Text>
            </Pressable>
        </View>
    );
};

export default Returning;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        padding: 20,
    },
    welcomeBanner: {
        fontSize: 32,
        textAlign: 'center',
        color: '#000',
        margin: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
    },
    nameInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    submitButton: {
        marginTop: 'auto',
        backgroundColor: '#333',
        padding: 10,
        margin: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: THEME.TEXT_TERTIARY,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

