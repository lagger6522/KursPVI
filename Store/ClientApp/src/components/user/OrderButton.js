import React from 'react';

const OrderButton = ({ onClick }) => {
    return (
        <button className="order-button" onClick={onClick}>
            Оформить заказ
        </button>
    );
};

export default OrderButton;