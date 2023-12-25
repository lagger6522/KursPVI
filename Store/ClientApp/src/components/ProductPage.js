import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import sendRequest from './SendRequest';
import './ProductPage.css';

const ProductPage = () => {
    const location = useLocation();
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [error, setError] = useState('');


    useEffect(() => {
        if (location.state && location.state.subcategory) {
            const subcategory = location.state.subcategory;
            setSelectedSubcategory(subcategory);

            sendRequest(`/api/Categories/GetProductsBySubcategory`, 'GET', null, { subcategoryId: subcategory.subcategoryId })
                .then(response => {
                    setProducts(response);
                    initializeQuantities(response);
                })
                .catch(error => {
                    console.error('Ошибка при загрузке товаров по подкатегории:', error);
                });
        }
    }, [location.state]);

    const initializeQuantities = (products) => {
        const initialQuantities = {};
        products.forEach(product => {
            initialQuantities[product.productId] = 1;
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
            <h2>{selectedSubcategory ? `${selectedSubcategory.subcategoryName}` : 'Выберите подкатегорию'}</h2>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.productId} className="product-item">
                        <Link className="no-line" to={`/product-details/${product.productId}`}>
                            <img src={product.image} className="product-image" />
                        </Link>
                        <div className="product-details">
                            <Link className="no-line" to={`/product-details/${product.productId}`}>
                                <h5>{product.productName}</h5>
                            </Link>
                            <div>
                                <span>Оценка: {product.averageRating !== undefined ? product.averageRating.toFixed(1) : 'Нет оценки'}</span>
                                <span>({product.reviewCount !== undefined ? product.reviewCount : 0} отзыва(ов))</span>
                            </div>
                            <div className="cost">Цена: {product.price} руб.</div>
                            <div className="cart-controls">
                                <button className="counter-button" onClick={() => handleQuantityChange(product.productId, -1)}>-</button>
                                <input type="number" value={quantities[product.productId]} readOnly />
                                <button className="counter-button" onClick={() => handleQuantityChange(product.productId, 1)}>+</button>
                                <button className="cart-button" onClick={() => handleAddToCart(product.productId)}>В корзину</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
