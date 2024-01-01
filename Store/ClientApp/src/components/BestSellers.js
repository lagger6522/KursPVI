// BestSellers.jsx
import React, { useState, useEffect } from 'react';
import sendRequest from './SendRequest';
import './BestSellers.css';

const BestSellers = () => {
    const [bestSellersData, setBestSellersData] = useState([]);

    useEffect(() => {
        sendRequest('/api/Categories/GetBestSellers', 'GET', null, null)
            .then(data => {
                setBestSellersData(data);
            })
            .catch(error => console.error('Error fetching best sellers:', error));
    }, []);

    const handleAddToCart = (productId, quantity) => {
        console.log(`Товар ${productId} добавлен в корзину, количество: ${quantity}`);
    };

    return (
        <div className="best-sellers">
            <h2>Лидеры продаж</h2>
            <div className="product-list">
                {bestSellersData.map((product) => (
                    <div key={product.id} className="product-item">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <div className="product-details">
                            <h3>{product.name}</h3>
                            <div>
                                <span>Оценка: {product.rating}</span>
                                <span>({product.reviews} отзывов)</span>
                            </div>
                            <div className="cost">Цена: {product.price} руб.</div>
                            <div className="cart-controls">
                                <button className="counter-button" onClick={() => handleAddToCart(product.id, -1)}>-</button>
                                <input type="number" min="1" defaultValue="1" />
                                <button className="counter-button" onClick={() => handleAddToCart(product.id, 1)}>+</button>
                                <button className="cart-button" onClick={() => handleAddToCart(product.id, 1)}>В корзину</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestSellers;
