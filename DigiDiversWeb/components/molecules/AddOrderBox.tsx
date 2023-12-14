import Link from 'next/link';
import styles from '/styles/modules/Dashboard.module.scss';

const AddOrderBox: React.FC = () => {
    return (
        <Link href='/createOrder' className={styles.addBox} onClick={() => console.log('helo')}>+</Link>
    );
};

export default AddOrderBox;