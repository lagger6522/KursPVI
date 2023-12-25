// SearchResultPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import sendRequest from './SendRequest';
import './ProductPage.css';

const SearchResultPage = () => {
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        if (location.state && location.state.searchResults) {
            const results = location.state.searchResults;
            setSearchResults(results);
            initializeQuantities(results);
        }
    }, [location.state]);

    const initializeQuantities = (results) => {
        const initialQuantities = {};
        results.forEach(result => {
            initialQuantities[result.productId] = 1;
        });
        setQuantities(initialQuantities);
    };

    const handleQuantityChange = (productId, amount) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: Math.max(prevQuantities[productId] + amount, 1),
        }));
    };

    const handleAddToCart = (productId) => {
        const quantity = quantities[productId];
        var userId = sessionStorage.getItem("userId");

        if (!userId) {
            setError('Для добавления товара в корзину необходимо войти в систему.');
            return;
        }
        sendRequest('/api/Categories/AddToCart', 'POST', {
            productId,
            userId,
            quantity,
        })
            .then(response => {
                console.log('Товар успешно добавлен в корзину:', response);
            })
            .catch(error => {
                console.error('Ошибка при добавлении товара в корзину:', error);
            });
    };

    return (
        <div className="product-page">
            <h2>Результаты поиска</h2>
            <div className="product-list">
                {searchResults.map((result) => (
                    <div key={result.productId} className="product-item">
                        <Link className="no-line" to={`/product-details/${result.productId}`}>
                            <img src={result.image} className="product-image" alt={result.productName} />
                        </Link>
                        <div className="product-details">
                            <Link className="no-line" to={`/product-details/${result.productId}`}>
                                <h5>{result.productName}</h5>
                            </Link>
                            <div>
                                <span>Оценка: {result.averageRating !== undefined ? result.averageRating.toFixed(1) : 'Нет оценки'}</span>
                                <span>({result.reviewCount !== undefined ? result.reviewCount : 0} отзыва(ов))</span>
                            </div>
                            <div className="cost">Цена: {result.price} руб.</div>
                            <div className="cart-controls">
                                <button className="counter-button" onClick={() => handleQuantityChange(result.productId, -1)}>-</button>
                                <input type="number" value={quantities[result.productId]} readOnly />
                                <button className="counter-button" onClick={() => handleQuantityChange(result.productId, 1)}>+</button>
                                <button className="cart-button" onClick={() => handleAddToCart(result.productId)}>В корзину</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResultPage;
