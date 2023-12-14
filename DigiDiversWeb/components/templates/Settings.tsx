import React from 'react';

const AllOrders: React.FC = () => {
    return (
        <div>
            <h1>All Orders</h1>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>12345</td>
                        <td>John Doe</td>
                        <td>01/01/2022</td>
                        <td>$100.00</td>
                    </tr>
                    <tr>
                        <td>23456</td>
                        <td>Jane Doe</td>
                        <td>02/01/2022</td>
                        <td>$200.00</td>
                    </tr>
                    <tr>
                        <td>34567</td>
                        <td>John Smith</td>
                        <td>03/01/2022</td>
                        <td>$150.00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AllOrders;
