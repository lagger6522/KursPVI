import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import sendRequest from './SendRequest';
import './ProductPage.css';

const ProductPage = () => {
    const location = useLocation();
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (location.state && location.state.subcategory) {
            const subcategory = location.state.subcategory;
            setSelectedSubcategory(subcategory);

            sendRequest(`/api/Categories/GetProductsBySubcategory`, 'GET', null, { subcategoryId: subcategory.subcategoryId })
                .then(response => {
                    setProducts(response);
                })
                .catch(error => {
                    console.error('Ошибка при загрузке товаров по подкатегории:', error);
                });
        }
    }, [location.state]);

    const handleAddToCart = (productId, quantity) => {
        // Ваша логика добавления товара в корзину
        console.log(`Добавление товара ${productId} в корзину с количеством ${quantity}`);
    };

    return (
        <div className="product-page">
            <h2>{selectedSubcategory ? `${selectedSubcategory.subcategoryName}` : 'Выберите подкатегорию'}</h2>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.productId} className="product-item">
                        <img src={product.image} alt={product.productName} className="product-image" />
                        <div className="product-details">
                            <h3>{product.productName}</h3>
                            <div>
                                <span>Оценка: {product.rating}</span>
                                <span>({product.reviews} отзывов)</span>
                            </div>
                            <div>Цена: {product.price} руб.</div>
                            <div className="cart-controls">
                                <button className="counter-button" onClick={() => handleAddToCart(product.productId, -1)}>-</button>
                                <input type="number" min="1" defaultValue="1" />
                                <button className="counter-button" onClick={() => handleAddToCart(product.productId, 1)}>+</button>
                                <button className="cart-button" onClick={() => handleAddToCart(product.productId, 1)}>В корзину</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
