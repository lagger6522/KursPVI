import React, { useState, useEffect } from 'react';
import sendRequest from '../SendRequest';

const MyOrdersPage = () => {
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');

        if (userId) {
            sendRequest(`/api/User/GetOrdersByUserId`, null, { userId })
                .then((orders) => {
                    setUserOrders(orders);
                })
                .catch((error) => {
                    console.error('Ошибка при загрузке заказов:', error);
                });
        }
    }, []);

    return (
        <div className="my-orders-page">
            <h2>Мои заказы</h2>
            {userOrders.length > 0 ? (
                <ul>
                    {userOrders.map((order) => (
                        <li key={order.orderId}>
                            <div>
                                <strong>Номер заказа:</strong> {order.orderNumber}
                            </div>
                            <div>
                                <strong>Дата заказа:</strong> {order.orderDate}
                            </div>
                            {/* Другие детали заказа, которые вы хотите отобразить */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>У вас пока нет заказов.</p>
            )}
        </div>
    );
};

export default MyOrdersPage;
