import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import OrderButton from './OrderButton';
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

    const handleQuantityChange = async (productId, newQuantity) => {
        try {
            await sendRequest(`/api/Categories/UpdateCartItemQuantity`, 'POST', {
                userId: userId,
                productId: productId,
                quantity: newQuantity,
            });

            const updatedCartItems = cartItems.map(item => {
                if (item.product.productId === productId) {
                    return {
                        ...item,
                        quantity: newQuantity,
                    };
                }
                return item;
            });

            setCartItems(updatedCartItems);
        } catch (error) {
            console.error('Ошибка при обновлении количества товара:', error);
        }
    };


    const handleRemoveFromCart = async (productId) => {
        try {
            // Отправляем запрос на сервер для удаления товара из корзины
            await sendRequest(`/api/Categories/RemoveCartItem`, 'POST', {
                userId: userId,
                productId: productId,
            });

            // Если запрос успешен, обновляем состояние компонента
            const updatedCartItems = cartItems.filter(item => item.product.productId !== productId);
            setCartItems(updatedCartItems);

            // Обновляем данные в localStorage
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        } catch (error) {
            console.error('Ошибка при удалении товара из корзины:', error);
        }
    };

    const handleOrderButtonClick = () => {
        // Логика оформления заказа
        console.log('Заказ оформлен!');
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
            <OrderButton onClick={handleOrderButtonClick} />
        </div>
    );
};

export default CartPage;
