import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LAYOUT, THEME } from '../../styles';
import { ProfileInfo, ProfileStat } from '../../context';

const GridElement: React.FC<ProfileStat> = ({ label = "", stat = "" }: ProfileStat) => (
    <View style={styles.gEle} >
        <Text style={styles.gEleHead}>
            {stat}
        </Text>
        <Text style={styles.gEleSub}>
            {label}
        </Text>
    </View>
);

interface ProfileGridProps {
    gridData: ProfileInfo;
    loading: boolean;
}

const ProfileGrid: React.FC<ProfileGridProps> = ({ gridData, loading }: ProfileGridProps) => {
    return (
        <View style={styles.gridContainer}>
            <View style={styles.row}>
                <GridElement stat={gridData[0].stat} label={gridData[0].label} />
                <GridElement stat={gridData[1].stat} label={gridData[1].label} />
            </View>
            <View style={styles.row}>
                <GridElement stat={gridData[2].stat} label={gridData[2].label} />
                <GridElement stat={gridData[3].stat} label={gridData[3].label} />
            </View>
        </View>
    );
};

export default ProfileGrid;


const BOX_PAD = 32;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: LAYOUT.WINDOW_HEIGHT / 2 - 100,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        position: 'relative',
    },
    digiText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: THEME.TEXT_PRIMARY,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    backButtonText: {
        fontSize: 40,
        color: THEME.TEXT_PRIMARY,

        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'column',

        justifyContent: 'flex-start',

        lineHeight: 30,
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: LAYOUT.WINDOW_WIDTH / 2.25,
        height: LAYOUT.WINDOW_WIDTH / 2.25,
        borderRadius: LAYOUT.WINDOW_WIDTH / 4,
        margin: 20,
    },
    gridContainer: {
        marginTop: 40,

        width: '90%',
        height: LAYOUT.WINDOW_HEIGHT / 3,

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        elevation: 3,
        borderRadius: 3,

        background: THEME.BG_PRIMARY,
    },
    row: {
        flexDirection: 'row',
        flex: 1,

    },
    gEle: {
        flex: 1,
        height: '100%',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',


        padding: BOX_PAD,
    },
    gEleHead: {
        fontSize: 40,
        fontWeight: 'bold',
        color: THEME.PRIMARY_BLUE,
    },
    gEleSub: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME.TEXT_SECONDARY,
        textTransform: 'uppercase',
    }
});