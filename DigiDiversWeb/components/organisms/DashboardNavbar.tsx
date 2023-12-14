import React from 'react';
import styles from '/styles/modules/Navbar.module.scss';
import dynamic from 'next/dynamic';
import Link from 'next/link';


const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);


const DashboardNavbar: React.FC = () => {
    return (
        <nav className={styles.dashNav}>
            <div className={styles.leftCol}>
                <Link href='/' className={styles.logo}>DigiDivers</Link>
            </div>
            <div className={styles.rightCol}>
                <WalletMultiButtonDynamic className={styles.walletButton} />
            </div>
        </nav>
    );
};

export default DashboardNavbar;
