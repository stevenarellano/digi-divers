// LandingPage.tsx
import React, { useState } from 'react';
import styles from '/styles/modules/Landing.module.scss';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';

const LandingPage: React.FC = () => {
    const [email, setEmail] = useState('');



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Add code to submit email to mailing list
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>Empower Your Data</div>
            <div className={styles.subtitle}>
                Transform your unlabeled data into quality,
                usable data in a matter of seconds at a low cost.
            </div>
            <img
                src="/landing-graphic.png"
                alt="My graphic"
                className={styles.graphic}
            />
            <Link href='/dashboard' className={styles.launchButton}>Launch Dashboard</Link>
        </div>
    );
};

export default LandingPage;
