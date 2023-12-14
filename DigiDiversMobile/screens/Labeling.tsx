import React, { useEffect, useRef, useState, } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Pressable, Animated, Image } from 'react-native';
import { LAYOUT, THEME } from '../styles';
import { BackdropWrapper, GradientWrapper, LabelCard, LabelHeader } from '../components';
import { useRecoilValue } from 'recoil';
import { digiState } from '../context';

export enum LabelStatus {
    awaiting = 0,
    labeling = 1,
    wrong = 2,
    levelUp = 3,
    noMore = 4,
}

export const LEVEL_MULTIPLIER = 0.01;

const LevelUp = ({ setStatus }: any) => {
    const digi = useRecoilValue(digiState);

    return (
        <GradientWrapper style={styles.pauseContainer} >
            <Image source={require('../assets/icons/trophy.png')} style={styles.pauseIcon} />
            <Text style={styles.pauseHeader}>level up!</Text>
            <Text style={styles.pauseSubtitle}>
                Your DigiDiver reached level {digi.attributes.Level}!
                You will now earn an extra {LEVEL_MULTIPLIER} SOL per image labeled.
            </Text>
            <Pressable style={styles.continueButton} onPress={() => setStatus(LabelStatus.labeling)}>
                <Text style={styles.continueButtonText}>CONTINUE</Text>
            </Pressable>
        </GradientWrapper>
    );
};

const NoMore = ({ setStatus }: any) => {

    return (
        <GradientWrapper style={styles.pauseContainer} >
            <Image source={require('../assets/icons/thumbs.png')} style={styles.pauseIcon} />
            <Text style={styles.pauseHeader}>Congrats!</Text>
            <Text style={styles.pauseSubtitle}>
                You've labeled all the images in our database. Check back later for more!
            </Text>
        </GradientWrapper>
    );
};

const Wrong = ({ setStatus }: any) => {
    return (
        <GradientWrapper style={styles.pauseContainer} >
            <Image source={require('../assets/icons/x.png')} style={styles.pauseIcon} />
            <Text style={styles.pauseHeader}>oops!</Text>
            <Text style={styles.pauseSubtitle}>
                our system detected that you labeled that image incorrectly.
                Your DigiDiver's rating has been decreased.
            </Text>

            <Pressable style={styles.continueButton}  onPress={() => setStatus(LabelStatus.labeling)}>
                <Text style={styles.continueButtonText}>CONTINUE</Text>
            </Pressable>

        </GradientWrapper>
    );
};

const Awaiting = ({ setStatus, earned }: any) => {
    useEffect(() => {
        const interval = setInterval(() => {
            setStatus(LabelStatus.labeling);
        }, 1500);
        return () => clearInterval(interval);
    }, [setStatus]);

    return (
        <GradientWrapper style={styles.awaitContainer}>
            {
                earned ?
                    <Text style={styles.earnedText}>{`You Earned ${earned} SOL!`}</Text> :
                    <Text style={styles.earnedText}>Get ready to earn!</Text>
            }
            <ActivityIndicator size="large" color="white" />
            <Text style={styles.earnedText}>Loading next image...</Text>
        </GradientWrapper>
    );
};

const Labeling: React.FC = ({ navigation }: any) => {
    const [status, setStatus] = useState(LabelStatus.awaiting);
    const [earned, setEarned] = useState(0);


    const statuses = [
        <Awaiting
            setStatus={setStatus}
            earned={earned}
        />,
        <LabelCard
            navigation={navigation}
            setStatus={setStatus}
            setEarned={setEarned}
        />,
        <Wrong setStatus={setStatus} />,
        <LevelUp setStatus={setStatus} />,
        <NoMore setStatus={setStatus} />,
    ];

    return (
        <BackdropWrapper style={styles.container}>
            <LabelHeader navigation={navigation} />
            {statuses[status]}
        </BackdropWrapper >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.BG_PRIMARY,

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    awaitContainer: {
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -LAYOUT.WINDOW_HEIGHT * 0.15 }],
        alignSelf: 'center',
        justifySelf: 'center',

        borderRadius: 10,

        width: LAYOUT.WINDOW_WIDTH * 0.9,
        paddingTop: 20,
        paddingBottom: 20,

        gap: 20,

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pauseContainer: {
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -LAYOUT.WINDOW_HEIGHT * 0.15 }],
        alignSelf: 'center',
        justifySelf: 'center',

        borderRadius: 10,

        width: LAYOUT.WINDOW_WIDTH * 0.9,
        paddingTop: 20,
        paddingBottom: 20,

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pauseHeader: {
        fontSize: 50,
        fontWeight: 'bold',
        color: THEME.TEXT_PRIMARY,
        fontFamily: THEME.FONT_PRIMARY,

        width: '80%',
        textAlign: 'center',
    },
    pauseSubtitle: {
        fontSize: 20,
        color: THEME.TEXT_PRIMARY,
        fontFamily: THEME.FONT_PRIMARY,

        width: '80%',
        textAlign: 'center',
    },
    continueButton: {
        marginTop: 20,

        borderRadius: 10,
        padding: 10,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        width: '60%',
        backgroundColor: THEME.BG_SECONDARY,
    },
    continueButtonText: {
        color: THEME.TEXT_TERTIARY,
        fontFamily: THEME.FONT_SECONDARY,
        fontSize: 16,
        fontWeight: 'bold',
    },
    earnedText: {
        marginTop: 20,
        color: THEME.TEXT_PRIMARY,
        fontFamily: THEME.FONT_PRIMARY,
        fontSize: 20,
        textTransform: 'uppercase',
    },
    pauseIcon: {
        backgroundColor: THEME.BG_PRIMARY,
        width: 100,
        height: 100,
        borderRadius: 50,
    }
});

export default Labeling;
