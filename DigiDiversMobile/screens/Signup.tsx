import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LAYOUT, THEME } from '../styles';
import { BackdropWrapper, GradientWrapper } from '../components';
import { useRecoilValue } from 'recoil';
import { digiState } from '../context';

function WelcomeCard() {
    return (
        <GradientWrapper style={styles.welcomeCard}>
            <Text style={styles.title}>WELCOME!</Text>
            <Text style={styles.subtitle}>
                We just sent you your very first DigiDiver! Click start to start labeling and get earning!
            </Text>
        </GradientWrapper>
    );
}

function NftInfo() {
    const digi = useRecoilValue(digiState);
    return (
        <GradientWrapper style={styles.nftInfoContainer}>
            <Image
                style={styles.nftImg}
                source={{ uri: digi.imageUrl }}
            />
            <View style={styles.infoRow}>
                <Text style={styles.nftInfo}>{digi.name}</Text >

            </View>
        </GradientWrapper >
    );
}

export default function Signup({ navigation }: any) {

    const goToLabeling = () => navigation.navigate('Labeling');

    return (
        <BackdropWrapper style={styles.container}>
            <WelcomeCard />
            <NftInfo />
            <Pressable style={styles.startButton} onPress={goToLabeling}>
                <Text style={styles.startButtonText}>START PLAYING</Text>
            </Pressable>
        </BackdropWrapper>
    );
}

const textPadX = {
    paddingLeft: 32,
    paddingRight: 32,
};

const CARD_WIDTH = '80%';

const styles = StyleSheet.create({
    container: {
        flex: 1,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',


        paddingTop: 40,
        gap: 40,
        backgroundColor: THEME.BG_PRIMARY,
    },
    welcomeCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',

        width: CARD_WIDTH,
        height: LAYOUT.WINDOW_HEIGHT / 4,

        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        fontFamily: THEME.FONT_PRIMARY,
        color: THEME.TEXT_PRIMARY,
    },
    subtitle: {
        fontSize: 18,
        fontFamily: THEME.FONT_SECONDARY,
        color: THEME.TEXT_SECONDARY,
    },
    nftInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,


        width: CARD_WIDTH,
        borderRadius: 10,

        padding: 20,
    },
    nftInfo: {
        color: THEME.TEXT_PRIMARY,
        fontFamily: THEME.FONT_PRIMARY,
        fontSize: 32,
        fontWeight: 'bold',
    },
    infoRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

        alignItems: 'center',
        width: '100%',
    },
    nftImg: {
        width: LAYOUT.WINDOW_WIDTH * 0.8 * 0.9,
        height: LAYOUT.WINDOW_WIDTH * 0.8 * 0.9,
        borderRadius: 10,
    },
    startButton: {
        width: '80%',

        position: 'absolute',
        alignSelf: 'center',
        bottom: "6%",
        borderRadius: 10,

        backgroundColor: THEME.BG_SECONDARY,

        alignItems: 'center',
        padding: 15,
    },
    startButtonText: {
        color: THEME.TEXT_TERTIARY,
        fontFamily: THEME.FONT_SECONDARY,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
