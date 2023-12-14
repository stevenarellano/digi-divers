import Link from 'next/link';
import styles from '/styles/modules/Navbar.module.scss';

const GetStartedButton = () => (
    <Link className={styles.dashboardButton} href="/dashboard">dashboard</Link>
);

export default GetStartedButton;