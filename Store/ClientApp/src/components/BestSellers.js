import React from 'react';
import './BestSellers.css';

const BestSellers = () => {
    const bestSellersData = [
        {
            id: 1,
            name: 'Товар 1',
            image: 'url-to-image-1',
            rating: 4.5,
            reviews: 10,
            price: 20.99,
        },
        {
            id: 2,
            name: 'Товар 2',
            image: 'url-to-image-2',
            rating: 4.2,
            reviews: 8,
            price: 15.99,
        },
        {
            id: 3,
            name: 'Товар 3',
            image: 'url-to-image-2',
            rating: 4.2,
            reviews: 8,
            price: 15.99,
        },       
    ];

    const handleAddToCart = (productId, quantity) => {
        // Логика добавления товара в корзину
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
                            <div>Цена: {product.price} руб.</div>
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
