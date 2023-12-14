import styles from '/styles/modules/Dashboard.module.scss';
import { CompletedOrderBox, Spinner } from '../molecules';
import { TaskInfo } from '../../types';
import { useGetOrder } from '../../api';
import { useCallback, useEffect, useState } from 'react';
import usePhantom from '../../api/usePhantom/usePhantom';


const finishedTasks: TaskInfo[] = [
    {
        task_id: 1,
        task_name: "Task 1",
        size: 100,
        items_remaining: 0,
        user_id: "1234",
        instructions: "Instructions",
    },
    {
        task_id: 2,
        task_name: "Task 2",
        size: 131,
        items_remaining: 0,
        user_id: "1234",
        instructions: "Instructions",
    },
];

const Completed: React.FC = () => {
    const { fetchDoneOrders } = useGetOrder();
    const { getBase58WalletAddress } = usePhantom();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<TaskInfo[]>([]);

    const getAndSetOrders = useCallback(async () => {
        console.log("fetching orders");
        try {
            const res = await fetchDoneOrders(getBase58WalletAddress());
            if (res) {
                setOrders(res);
            }
        } catch (error) {
            console.log(error);

        }
        setLoading(false);
    }, [fetchDoneOrders, getBase58WalletAddress]);

    useEffect(() => {
        if (loading && orders.length === 0) {
            getAndSetOrders();
        }
    }, [getAndSetOrders, loading, orders.length]);

    return (
        <div className={styles.sectionContainer}>
            <Spinner isLoading={loading} />
            {orders.length === 0 && !loading && ( // conditionally render the message
                <div className={styles.noOrders}>No orders completed. Please check back later.</div>
            )}
            <div style={{ display: loading ? 'none' : 'flex' }} className={styles.boxArea}>
                {orders.map((task) => (
                    <CompletedOrderBox taskInfo={task} key={task.task_id} />
                ))}
            </div>
        </div>
    );
};

export default Completed;
