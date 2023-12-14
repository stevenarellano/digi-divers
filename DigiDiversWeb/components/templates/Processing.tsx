import React, { useCallback, useEffect, useState } from 'react';
import styles from '/styles/modules/Dashboard.module.scss';
import { AddOrderBox, ProcessingOrderBox, Spinner } from '../molecules';
import { TaskInfo } from '../../types';
import { useGetOrder, usePhantom } from '../../api';

const processingTasks: TaskInfo[] = [
    {
        task_id: 1,
        task_name: "Task 1",
        size: 100,
        items_remaining: 43,
        user_id: "1234",
        instructions: "Instructions",
    },
    {
        task_id: 2,
        task_name: "Task 2",
        size: 131,
        items_remaining: 12,
        user_id: "1234",
        instructions: "Instructions",
    },
];

const Processing: React.FC = () => {
    const { fetchProcessingOrders } = useGetOrder();
    const { getBase58WalletAddress } = usePhantom();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<TaskInfo[]>([]);

    const getAndSetOrders = useCallback(async () => {
        try {
            const res = await fetchProcessingOrders(getBase58WalletAddress());
            if (res) {
                setOrders(res);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }, [fetchProcessingOrders, getBase58WalletAddress]);

    useEffect(() => {
        if (loading && orders.length === 0) {
            getAndSetOrders();
        }
    }, [getAndSetOrders, loading, orders.length]);

    return (
        <div className={styles.sectionContainer}>
            <Spinner isLoading={loading} />
            {orders.length === 0 && !loading && ( // conditionally render the message
                <div className={styles.noOrders}> No orders processing. Place an order to get data labeled.</div>
            )}
            <div style={{ display: loading || orders.length === 0 ? 'none' : 'flex' }} className={styles.boxArea}>
                {orders.map((box: TaskInfo) => (
                    <ProcessingOrderBox taskInfo={box} key={box.task_id} />
                ))}
            </div>
        </div>
    );
};

export default Processing;
