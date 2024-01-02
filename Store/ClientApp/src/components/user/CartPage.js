import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import OrderButton from './OrderButton';
import sendRequest from '../SendRequest';
import './CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        if (userId) {

            if (!userId) {
                console.warn('Для просмотра корзины необходимо войти в систему.');
                return;
            }
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
            if (newQuantity < 1) {
                console.warn('Количество товара не может быть меньше 0');
                return;
            }

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
        navigate('/order-form');
    };

    return (
        <div className="cart-page">
            <h2>Корзина</h2>
            {!userId && (
                <div className="notification">
                    <p>Для просмотра корзины необходимо войти в систему.</p>
                </div>
            )}
            {userId && (
                <div>
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
            )}
        </div>
    );
};

export default CartPage;
