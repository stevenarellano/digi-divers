import React, { useCallback, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    Modal,
} from 'react-native';
import { LAYOUT, THEME } from '../../styles';
import { GradientWrapper } from '../wrappers';
import { useLabel } from '../../services';
import { LabeledData } from '../../context';


const ExampleModal = ({ isModalVisible, toggleModalVisibility, task_id }: any) => {
    const { fetchExample } = useLabel();
    const [loading, setLoading] = useState(false);
    const [example, setExample] = useState<LabeledData>({
        unique_id: '',
        date_uploaded: new Date(),
        file_name: '',
        task_id: 0,
        label: '',
        image_blob: Buffer.from([3, 2]),
    });

    const getAndSetExample = useCallback(async () => {
        console.log('called getAndSetExample');
        try {
            setLoading(true);

            const fetchResponse: LabeledData = await fetchExample(task_id);
            setExample({ ...fetchResponse, image_blob: Buffer.from(fetchResponse.image_blob) });
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch unlabeled data: ', error);
        }
    }, [fetchExample, task_id]);

    useEffect(() => {
        if (loading === false && example.unique_id === '') {
            getAndSetExample();
        }
    }, [example.unique_id, getAndSetExample, loading]);

    return (
        <>
            <Modal
                transparent={true}
                visible={isModalVisible}
                statusBarTranslucent
                onRequestClose={toggleModalVisibility}
                animationType="fade"
            >
                <View style={styles.modalBackground}>
                    <GradientWrapper style={styles.exampleModal}>
                        <Text style={styles.modalTitle}>EXAMPLE</Text>
                        <Image style={styles.exampleImg} source={{ uri: `data:image/png;base64,${example.image_blob.toString('base64')}` }} />

                        <Pressable style={styles.closeButton} onPress={toggleModalVisibility}>
                            <Text style={styles.closeButtonText}>CLOSE</Text>
                        </Pressable>

                    </GradientWrapper>
                </View>
            </Modal>
        </>
    );
};


const styles = StyleSheet.create({
    exampleModal: {
        backgroundColor: THEME.BG_PRIMARY,

        width: LAYOUT.WINDOW_WIDTH * 0.9,

        borderRadius: 25,
        elevation: 15,
        zIndex: 100,


        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',

        paddingTop: 32,
        paddingBottom: 32,
        paddingLeft: 16,
        paddingRight: 16,
    },
    modalBackground: {
        height: LAYOUT.WINDOW_HEIGHT,
        width: LAYOUT.WINDOW_WIDTH,

        backgroundColor: 'rgba(0,0,0,0.7)',


        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: THEME.TEXT_PRIMARY,
        width: '100%',

    },
    exampleImg: {
        resizeMode: 'contain',
        width: '100%',
        height: 400,
    },
    closeButton: {
        width: '100%',
        backgroundColor: THEME.BG_SECONDARY,
        alignSelf: 'center',
        borderRadius: 10,

        alignItems: 'center',
        padding: 15,
    },
    closeButtonText: {
        color: THEME.TEXT_TERTIARY,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ExampleModal;