import React from 'react';
import styles from '/styles/modules/Navbar.module.scss';
import { GetStartedButton } from '../atoms';
import Link from 'next/link';

const LandingNavbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>DigiDivers</div>
            <Link
                target="_blank"
                href='https://www.figma.com/file/mawCH0GwUGQVvHlfgC0SlR/digiDivers?node-id=0%3A1&t=E1Eu4nxjODHD66JM-0'
            >
                Roadmap
            </Link>
            <Link
                target="_blank"
                href='https://www.figma.com/file/mawCH0GwUGQVvHlfgC0SlR/digiDivers?node-id=0%3A1&t=E1Eu4nxjODHD66JM-0'>
                Docs
            </Link>
            {/* <GetStartedButton /> */}
        </nav>
    );
};

export default LandingNavbar;
