import React, { useState } from 'react';
import { AddOrderFormData, COST_PER_LABEL, } from '../../../context';
import { FirstScreen, SecondScreen } from './';
import { useAddOrder } from '../../../api';
import { TransactionSignature } from '@solana/web3.js';

interface Props {
    onSubmit: (data: AddOrderFormData) => void;
}

enum Screen {
    FIRST,
    SECOND,
}

function downloadFile(file: File) {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const AddOrder: React.FC<Props> = () => {
    const { sendSolToEscrow, sendFormData } = useAddOrder();
    const [screen, setScreen] = useState(Screen.FIRST);


    const handleFirstScreenSubmit = (data: AddOrderFormData) => {
        setScreen(Screen.SECOND);
    };

    const handleSecondScreenBack = () => {
        setScreen(Screen.FIRST);
    };

    const handleSecondScreenSubmit = async (data: AddOrderFormData) => {
        console.log(data);
        // send sol
        // const txnSignature = 'asdf';
        console.log(data.dataCount);
        const txnSignature: TransactionSignature = await sendSolToEscrow((data.dataCount || 0) * COST_PER_LABEL);
        if (txnSignature.length !== 0) { // then send data to backend
            sendFormData(data);
            return;
        }
        // send data to server

    };

    return (
        <>
            {screen === Screen.FIRST && <FirstScreen onNext={handleFirstScreenSubmit} />}
            {screen === Screen.SECOND && <SecondScreen onBack={handleSecondScreenBack} onSubmit={handleSecondScreenSubmit} />}
        </>
    );
};

export default AddOrder;