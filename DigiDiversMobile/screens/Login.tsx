import { StyleSheet, Text, Pressable, ImageBackground, ActivityIndicator, Image } from 'react-native';
import { useLabel, useLocalWallet, useNft } from '../services';
import { LAYOUT, THEME } from '../styles';
import { BackdropWrapper } from '../components';
import { useState } from 'react';

const Login: React.FC = ({ navigation }: any) => {
    const { authorizeWallet } = useLocalWallet();
    const { fetchDigiInfo } = useNft();
    const [loading, setLoading] = useState(false);
    const { fetchExample, fetchToLabel, uploadLabel } = useLabel();

    const onConnect = async () => {
        try {
            setLoading(true);
            const addr = await authorizeWallet();
            await fetchDigiInfo(addr);
            setLoading(false);
            navigation.navigate('App');
        } catch (error) {
            console.log('Failed to connect to your wallet: ', error);
        }
    };

    return (
        <BackdropWrapper style={styles.container}>
            {/* <Text style={styles.titleText}>DIGIDIVERS</Text> */}
            <Image source={require('../assets/icons/text-logo.png')} style={styles.textLogo} />
            <Pressable
                style={styles.connectButton}
                onPress={onConnect}
                disabled={loading} >
                {loading ? ( // show the spinner when loading
                    <ActivityIndicator size="small" color={THEME.TEXT_TERTIARY} />
                ) : (
                    <Text style={styles.connectButtonText}>CONNECT WALLET</Text>
                )}
            </Pressable>
        </BackdropWrapper>

    );
};
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 40,

        gap: 10,

        backgroundColor: THEME.BG_PRIMARY,
    },
    connectButton: {
        borderRadius: 10,
        width: "85%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.BG_SECONDARY,
        padding: 15,
    },
    titleText: {

        fontSize: 50,
        fontWeight: 'bold',

        color: THEME.TEXT_PRIMARY,
        fontFamily: THEME.FONT_PRIMARY,

    },
    connectButtonText: {
        color: THEME.TEXT_TERTIARY,
        fontFamily: THEME.FONT_SECONDARY,
        fontSize: 16,
        fontWeight: 'bold',
    },
    textLogo: {
        width: 300,
        position: 'absolute',
        top: "50%",
        transform: [{ translateY: -LAYOUT.WINDOW_HEIGHT * 0.05 }],
    }
});



