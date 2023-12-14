import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { GradientWrapper, ProfileGrid } from '../components';
import { LAYOUT, THEME } from '../styles';
import { DigiInfo, ProfileInfo, digiState } from '../context';
import { useRecoilValue } from 'recoil';
import { useNft } from '../services';


const gridDataExample: ProfileInfo = [ // test example
    {
        stat: '9090',
        label: 'Rating',
    },
    {
        stat: '02/23',
        label: 'Joined',
    },
    {
        stat: '1',
        label: 'Level',
    },
    {
        stat: '1/10',
        label: 'Experience',
    },
];

const Profile: React.FC = ({ navigation }: any) => {
    const digi: DigiInfo = useRecoilValue(digiState);
    const [gridData, setGridData] = useState<ProfileInfo>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { fetchDigiInfo } = useNft();

    useEffect(() => {
        async function getProfileInfo() {
            // const digiInfo: DigiInfo = await fetchDigiInfo(); // TODO: WHEN IMPLEMENTED ON BACKEND - UNCOMMENT
            const digiInfo: DigiInfo = digi; // TODO: DELETE WHEN IMPLEMENTED ON BACKEND

            const res: ProfileInfo = [
                { label: 'Rating', stat: digiInfo.attributes.Rating },
                { label: "Level", stat: digiInfo.attributes.Level },
                { label: "Experience", stat: `${digiInfo.attributes.Experience}/10` },
                { label: "Joined", stat: "03/23" },
            ];

            setGridData(res);
            console.log(digiInfo);
        }

        getProfileInfo();
    }, [digi]);



    return (
        <View style={styles.container}>
            <GradientWrapper style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Labeling')}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Image
                    style={styles.profileImage}
                    source={require('../assets/nft.png')}
                />
                <Text style={styles.digiText}>DigiDiver #69</Text>
            </GradientWrapper>
            {/* CHANGE THE BELOW TO gridData WHEN IMPLEMENTED ON BACKEND */}
            <ProfileGrid gridData={gridDataExample} loading={loading} />
        </View>
    );
};

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
});

export default Profile;
