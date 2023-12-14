import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Animated, } from 'react-native';
import { LAYOUT, THEME } from '../../styles';
import { GradientWrapper } from '../wrappers';
import { useRecoilState } from 'recoil';
import { digiState } from '../../context';

export const LabelHeader: React.FC<any> = ({ navigation }: any) => {
    const [digi, setDigi] = useRecoilState(digiState);
    const [slideAnim] = useState(new Animated.Value(-LAYOUT.WINDOW_HEIGHT));

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }, [slideAnim]);

    return (
        <Animated.View style={{ ...styles.container, transform: [{ translateY: slideAnim }] }}>
            <GradientWrapper style={styles.header}>
                <Image
                    source={{ uri: digi.imageUrl }}
                    style={styles.profileIcon}
                />
                <View style={styles.profileInfoCol}>
                    <Text style={styles.profileName}>{digi.name}</Text>
                    <Text style={styles.profileExperience}>
                        Level: {digi.attributes.Level} | Experience: {digi.attributes.Experience}
                    </Text>
                    <Text style={styles.profileRating}>Rating: {digi.attributes.Rating}</Text>
                </View>
            </GradientWrapper>
        </Animated.View>
    );
};

const paddingX: any = {
    paddingLeft: 28,
    paddingRight: 28,
};

const btnStyling: any = {
    borderRadius: 10,
    padding: 10,
    flex: 1,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

};

const btnTextStyling: any = {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.TEXT_PRIMARY,
};

const styles = StyleSheet.create({
    text: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
    },
    container: {
        backgroundColor: THEME.BG_PRIMARY,

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    body: {
        flex: 1,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        height: LAYOUT.WINDOW_HEIGHT * 0.125,
        backgroundColor: THEME.BG_PRIMARY,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,

        padding: 16,
        gap: 16,

        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    profileInfoCol: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',

        flex: 1,
    },
    profileName: {
        color: THEME.TEXT_PRIMARY,
        fontFamily: THEME.FONT_PRIMARY,
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase'
    },
    profileExperience: {
        color: THEME.TEXT_PRIMARY,
        fontFamily: THEME.FONT_PRIMARY,
    },
    profileRating: {
        color: THEME.TEXT_PRIMARY,
        fontFamily: THEME.FONT_PRIMARY,
    },
    titleText: {
        color: THEME.TEXT_TERTIARY,
        fontFamily: THEME.FONT_PRIMARY,
        fontSize: 32,
        fontWeight: 'bold',
    },
    profileIcon: {
        height: LAYOUT.WINDOW_HEIGHT * 0.075,
        width: LAYOUT.WINDOW_HEIGHT * 0.075,
        borderRadius: 40,
        overflow: 'hidden',
    },
    exampleLink: {},
    subtitleText: {
        fontSize: 16,
        color: THEME.TEXT_PRIMARY,
        fontFamily: THEME.FONT_PRIMARY,
    },
    labelCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        gap: 8,
        padding: 16,
        paddingTop: 32,

        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardTitle: {
        color: THEME.TEXT_PRIMARY,
        fontSize: 24,
        fontWeight: 'bold',

        width: '100%',
    },
    cardSubtitle: {
        display: 'flex',
        flexDirection: 'row',

        color: THEME.TEXT_PRIMARY,
        fontSize: 16,

        width: '100%',

        marginBottom: 16,
    },
    imageContainer: {
        width: "100%",
        height: LAYOUT.WINDOW_HEIGHT * 0.5,

        borderRadius: 10,
        overflow: 'hidden',
    },
    unlabeledImage: {
        width: "100%",
        height: "100%",
    },
    submitButton: {
        backgroundColor: 'green',
        padding: 10,
        width: '45%',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    // EXAMPLE MODAL BELOW
    example: {
        fontSize: 16,
        display: 'flex',
        flexDirection: 'row',
    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
});