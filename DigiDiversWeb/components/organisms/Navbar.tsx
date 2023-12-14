import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LandingNavbar from './LandingNavbar';
import DashboardNavbar from './DashboardNavbar';


const Navbar: React.FC = () => {
    const [nav, setNav] = useState(<LandingNavbar />);
    const router = useRouter();

    useEffect(() => {
        if (router.pathname === '/' || router.pathname === 'landing') {
            setNav(<LandingNavbar />);
        } else {
            setNav(<DashboardNavbar />);
        }
    }, [router.pathname]);



    return (
        <>{nav}</>
    );
};

export default Navbar;
