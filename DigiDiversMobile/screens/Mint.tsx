import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    Pressable,
} from 'react-native';

import { useRecoilValue } from 'recoil';
import { walletState } from '../context';

const Mint: React.FC = ({ navigation }: any) => {
    const wallet = useRecoilValue(walletState);

    const [name, setName] = useState('');

    const handleSubmit = () => {
        // Perform NFT minting logic here
        console.log(wallet);

        navigation.navigate('Labeling');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeBanner}>Welcome to DigiDivers</Text>
            <Text style={styles.subtitle}>Enter your and create your profile to mint your NFT</Text>
            <TextInput
                style={styles.nameInput}
                onChangeText={text => setName(text)}
                value={name}
                placeholder="Your name"
            />
            <Pressable style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
        </View>
    );
};


export default Mint;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        padding: 20,
    },
    welcomeBanner: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
    },
    nameInput: {
        marginTop: 'auto',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    submitButton: {
        backgroundColor: '#333',
        padding: 10,
        margin: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

