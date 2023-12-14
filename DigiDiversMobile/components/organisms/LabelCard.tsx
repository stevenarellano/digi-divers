import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Image, Pressable, Animated, ActivityIndicator } from 'react-native';
import { LAYOUT, THEME } from '../../styles';
import { ExampleModal } from '.';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GradientWrapper } from '../wrappers';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LabeledData, UploadLabeledResponse, UploadResult, digiState, walletState } from '../../context';
import { useLabel } from '../../services';
import { LabelStatus } from '../../screens/Labeling';


export const TextButton = ({ title, onPress }: any) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.exampleLink}>
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <Text style={{ color: THEME.SECONDARY_BLUE, fontSize: 16, fontFamily: THEME.FONT_PRIMARY }}>&nbsp;{title}&nbsp;</Text>
        </TouchableOpacity>
    );
};

interface FetchToLabelResponse {
    unique_id: string;
    date_uploaded: Date;
    file_name: string;
    task_id: number;
    label: string;
    image_blob: Buffer;
}

interface UploadLabeledRequest {
    walletAddress: string;
    level: number;
    labeledData: FetchToLabelResponse;
}

export const LabelCard: React.FC<any> = ({ navigation, setStatus, setEarned }: any) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [slideUpAnim] = useState(new Animated.Value(LAYOUT.WINDOW_HEIGHT));
    const [loading, setLoading] = useState(false);
    const wallet = useRecoilValue(walletState);
    const [digi, setDigi] = useRecoilState(digiState);
    const { fetchToLabel, uploadLabel } = useLabel();
    const [toLabel, setToLabel] = useState<LabeledData>({
        unique_id: '',
        date_uploaded: new Date(),
        file_name: '',
        task_id: 0,
        label: '',
        image_blob: Buffer.from([3, 2]),
    });

    const getAndSetUnlabeledData = useCallback(async () => {
        console.log('called getAndSetUnlabeledData');
        try {
            const fetchResponse: LabeledData = await fetchToLabel();
            if (fetchResponse.file_name.startsWith('.')) {
                setStatus(LabelStatus.awaiting);
            }
            setLoading(true);
            console.log('fetchResponse: ', JSON.stringify({ ...fetchResponse, image_blob: fetchResponse.image_blob.length }));
            if (fetchResponse.task_id === -1) {
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setStatus(LabelStatus.noMore);
                }, 1000);
            }
            setToLabel({ ...fetchResponse, image_blob: Buffer.from(fetchResponse.image_blob) });
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch unlabeled data: ', error);
        }
    }, [fetchToLabel, setStatus]);

    useEffect(() => {
        if (loading === false && toLabel.unique_id === '') {
            getAndSetUnlabeledData();
        }
    }, [getAndSetUnlabeledData, loading, toLabel]);

    useEffect(() => {
        if (loading) {
            Animated.timing(slideUpAnim, {
                toValue: LAYOUT.WINDOW_HEIGHT,
                duration: 250, // adjust as needed
                useNativeDriver: false,
            }).start(() => {
                Animated.timing(slideUpAnim, {
                    toValue: 0,
                    duration: 250, // adjust as needed
                    delay: 1000,
                    useNativeDriver: false,
                }).start();
            });
        }
    }, [loading, slideUpAnim]);


    const toggleExampleModal = () => {
        console.log(`isModalVisible: ${isModalVisible}`);
        setIsModalVisible(!isModalVisible);
    };

    const labelImage = async (label: string) => {
        if (toLabel.label === 'yes' && label === 'No') {
            setLoading(true);
            setDigi({ ...digi, attributes: { ...digi.attributes, Rating: (Number(digi.attributes.Rating) - 10).toString() } });
            setTimeout(() => {
                setStatus(2);
                setLoading(false);
            }, 1000);
            return;
        }
        const labeledData: LabeledData = {
            ...toLabel,
            label,
        };

        const uploadResponse: UploadLabeledResponse = await uploadLabel(labeledData as FetchToLabelResponse);
        console.log(`uploadResponse: ${JSON.stringify(uploadResponse)}`);

        setLoading(true);
        setTimeout(() => {
            if (uploadResponse.result === UploadResult.earned || uploadResponse.result === UploadResult.levelUp) {
                console.log(`solEarned: ${uploadResponse.solEarned}`);
                setEarned(uploadResponse.solEarned!.toFixed(5));

                if (uploadResponse.result === UploadResult.levelUp) {
                    setStatus(LabelStatus.levelUp);
                } else {
                    console.log("setting status to awaiting");
                    setStatus(LabelStatus.awaiting);
                }
            }
        }, 1000);
    };

    const renderImageContainer = () => {
        return (loading) ?
            <ActivityIndicator size="large" color={'white'} /> :
            <Image
                style={[styles.unlabeledImage]}
                source={{ uri: `data:image/png;base64,${toLabel.image_blob.toString('base64')}` }}
            />;
    };

    return (
        <>
            {isModalVisible && <ExampleModal
                isModalVisible={isModalVisible}
                toggleModalVisibility={toggleExampleModal}
                task_id={toLabel.task_id}
            />}
            <Animated.View style={{ transform: [{ translateY: slideUpAnim }] }}>
                <GradientWrapper style={styles.labelCard}>
                    <Animated.View style={styles.imageContainer}>
                        {renderImageContainer()}
                    </Animated.View>
                    <Text style={styles.cardTitle}>Is this person doing a backflip?</Text>
                    <View style={styles.cardSubtitle}>
                        <Text style={styles.subtitleText}>click</Text>
                        <TextButton title="here" onPress={toggleExampleModal} />
                        <Text style={styles.subtitleText}>to see examples</Text>
                    </View>
                    <View style={styles.buttonRow}>
                        <View style={styles.btn}>
                            <Pressable onPress={() => labelImage('Yes')}>
                                <Text style={styles.btnText}>YES</Text>
                            </Pressable>
                        </View>
                        <View style={styles.btn}>
                            <Pressable onPress={() => labelImage('No')}>
                                <Text style={styles.btnText}>NO</Text>
                            </Pressable>
                        </View>
                    </View>
                </GradientWrapper>
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.BG_PRIMARY,
        flexDirection: 'column',
        justifyContent: 'space-between',
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
        fontFamily: THEME.FONT_PRIMARY,
        fontSize: 24,
        fontWeight: 'bold',
        width: '100%',
    },
    cardSubtitle: {
        display: 'flex',
        flexDirection: 'row',
        color: THEME.TEXT_PRIMARY,
        fontFamily: THEME.FONT_PRIMARY,
        fontSize: 16,
        width: '100%',
        marginBottom: 16,
    },
    imageContainer: {
        width: '100%',
        height: LAYOUT.WINDOW_HEIGHT * 0.5,
        borderRadius: 10,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
    unlabeledImage: {
        width: '100%',
        height: '100%',
    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    btn: {
        backgroundColor: THEME.BG_SECONDARY,




        borderRadius: 10,
        padding: 10,
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.TEXT_TERTIARY,
    },
});

