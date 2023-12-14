import { COST_PER_LABEL } from '../../context';
import { TaskInfo } from '../../types';
import styles from '/styles/modules/Dashboard.module.scss';

export type ProcessingOrderProps = {
    taskInfo: TaskInfo;
};


const PorcessingOrder: React.FC<ProcessingOrderProps> = ({ taskInfo }: ProcessingOrderProps) => {
    const { task_id, task_name, size, user_id, items_remaining } = taskInfo;


    return (
        <div className={styles.processingBox}>
            <div>{task_name}</div>
            <div><strong>Label Type: </strong>Image Classification</div>
            <div><strong>Data Count: </strong>{size}</div>
            <div><strong>Sol Cost: </strong>{COST_PER_LABEL * size}</div>
            <div style={{ marginTop: 'auto' }}><strong>Items Remaining: </strong>{items_remaining}/{size}</div>
        </div>
    );
};

export default PorcessingOrder;