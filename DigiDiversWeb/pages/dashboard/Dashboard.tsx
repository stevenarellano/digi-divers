/* eslint-disable react/jsx-key */
// Dashboard.tsx
import React, { useState } from 'react';
import styles from '/styles/modules/Dashboard.module.scss';
import { AddOrder, Completed, Processing } from '../../components';

import Image from 'next/image';
import { Check, Plus, Spinner } from '../../public';


const dashboardNavigation = [
    // { id: 0, title: 'All Orders', element: <AllOrders /> },
    { id: 2, title: 'Completed', element: <Completed /> },
    { id: 1, title: 'Processing', element: <Processing /> },
    { id: 3, title: 'Add New', element: <AddOrder onSubmit={() => console.log("helo")} /> },
];
const icons = [
    <Spinner />,
    <Check />,
    <Plus />,
];



const Dashboard: React.FC = () => {
    const [selectedData, setSelectedData] = useState(dashboardNavigation[0]);

    return (
        <div className={styles.container}>
            <div className={styles.leftColumn}>
                {dashboardNavigation.map((item, i) => (
                    <div
                        key={item.id}
                        className={`${styles.listItem} ${item.id === selectedData.id ? styles.selected : ''
                            }`}
                        onClick={() => setSelectedData(item)}
                    >
                        {icons[i]}  {item.title}
                    </div>
                ))}
            </div>
            <div className={styles.rightColumn}>{selectedData.element}</div>
        </div >
    );
};

export default Dashboard;
