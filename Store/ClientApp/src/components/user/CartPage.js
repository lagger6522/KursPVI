import React, { useState } from 'react';
import './CartPage.css'

const CartPage = () => {
    const cartItems = [
        { id: 1, name: 'Product 1', price: 20.99, quantity: 2 },
        { id: 2, name: 'Product 2', price: 15.99, quantity: 1 },
    ];

    const [cart, setCart] = useState(cartItems);

    // Пример функции для удаления товара из корзины
    const handleRemoveFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
    };

    return (
        <div>
            <h2>Корзина</h2>
            <ul>
                {cart.map(item => (
                    <li key={item.id}>
                        <div>
                            <span>{item.name}</span>
                            <span>{item.price} руб. x {item.quantity}</span>
                            <button onClick={() => handleRemoveFromCart(item.id)}>Удалить</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div>
                <strong>Итого: {cart.reduce((total, item) => total + item.price * item.quantity, 0)} руб.</strong>
            </div>
        </div>
    );
};

export default CartPage;
