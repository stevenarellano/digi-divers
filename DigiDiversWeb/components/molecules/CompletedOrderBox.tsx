import { useState } from 'react';
import styles from '/styles/modules/Dashboard.module.scss';
import { TaskInfo } from '../../types';
import { COST_PER_LABEL } from '../../context';
import { useGetOrder } from '../../api';

export type CompletedOrderProps = {
    taskInfo: TaskInfo;
};



const CompletedOrderBox: React.FC<CompletedOrderProps> = ({ taskInfo }: CompletedOrderProps) => {
    const { task_id, task_name, size, user_id, items_remaining } = taskInfo;
    const [downloading, setDownloading] = useState(false);
    const { fetchDoneOrder } = useGetOrder();


    const handleDownload = async () => {
        setDownloading(true);
        try {
            const res = await fetchDoneOrder(task_id || -1);
            console.log(JSON.stringify(res));

            // const data = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(res);
            link.setAttribute('download', `${task_id}.zip`);
            link.click();
        } catch (error) {
            console.error(error);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className={styles.completedBox}>
            <div>{task_name}</div>
            <div><strong>Label Type: </strong>Image Classification</div>
            <div><strong>Data Count: </strong>{size}</div>
            <div><strong>Sol Cost: </strong>{COST_PER_LABEL * size}</div>
            <button disabled={downloading} onClick={handleDownload}>
                {downloading ? 'Downloading...' : 'Download Data'}
            </button>
        </div>
    );
};

export default CompletedOrderBox;;