import React from 'react';
import styles from '../../styles/modules/Misc.module.scss'

interface SpinnerProps {
    isLoading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ isLoading }) => {
    if (!isLoading) {
        return null; // return null instead of false when isLoading is false
    }

    return (
        <div className={styles.spinnerOverlay}>
            <div className={styles.spinnerContainer} />
        </div>
    );
};

export default Spinner;
