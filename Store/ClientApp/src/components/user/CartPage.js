import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import sendRequest from '../SendRequest';
import './CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            sendRequest(`/api/Categories/GetCartItems`, 'GET', null, { userId })
                .then(response => {
                    setCartItems(response);
                })
                .catch(error => {
                    console.error('Ошибка при загрузке товаров в корзине:', error);
                });
        }
    }, [userId]);

    const handleQuantityChange = (productId, newQuantity) => {
        // Логика изменения количества товара в корзине
    };

    const handleRemoveFromCart = (productId) => {
        // Логика удаления товара из корзины
    };

    return (
        <div className="cart-page">
            <h2>Корзина</h2>
            <div className="cart-items">
                <div className="cart-item-header">
                    <p className="column1">Товар</p>
                    <p className="column2">Цена</p>
                    <p className="column3">Количество</p>
                    <p className="column4">Сумма</p>                        
                </div>
                {cartItems && cartItems.map((item) => (
                    <CartItem
                        key={item.productId}
                        product={item.product}
                        quantity={item.quantity}
                        handleQuantityChange={handleQuantityChange}
                        handleRemoveFromCart={handleRemoveFromCart}
                    />
                ))}
            </div>
            {/* Добавьте общую сумму, кнопку оформления заказа и другие элементы интерфейса */}
        </div>
    );
};

export default CartPage;
