import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import sendRequest from './SendRequest';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [error, setError] = useState('');



    useEffect(() => {
        sendRequest(`/api/Categories/GetProductDetails`, 'GET', null, { productId })
            .then(response => {
                setProduct(response);
            })
            .catch(error => {
                console.error('Ошибка при загрузке деталей товара:', error);
            });
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleQuantityChange = (amount) => {
        setQuantity(prevQuantity => Math.max(prevQuantity + amount, 1));
    };

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleReviewSubmit = () => {
        var userName = sessionStorage.getItem("userName");
        var userId = sessionStorage.getItem("userId");
        if (!userName) {
            setError('Имя пользователя не установлено.');
            return;
        }
        if (!rating || !reviewText.trim()) {
            setError('Чтобы отправить отзыв нужно выбрать оценку и написать отзыв');
            return;
        }
        
        sendRequest('/api/Categories/AddReview', 'POST', null, {
            productId,
            userId,
            rating,
            Comment: reviewText
        }).then(response => {
                console.log('Отправка отзыва:', response);
                setRating(0);
                setReviewText('');
                setError('');
            })
            .catch(error => {
                console.error('Ошибка при отправке отзыва:', error);
            });
    };

    const handleAddToCart = () => {
        var userId = sessionStorage.getItem("userId");
        if (!userId) {
            setError('Для добавления товара в корзину необходимо войти в систему.');
            return;
        }

        sendRequest('/api/Categories/AddToCart', 'POST', {
            productId,
            userId,
            quantity
        })
            .then(response => {
                console.log('Товар добавлен в корзину:', response);
                setError('');
            })
            .catch(error => {
                console.error('Ошибка при добавлении товара в корзину:', error);
            });
    };

    return (
        <div className="product-details-page">
            <div className="product-item">
                <Link className="no-line" to={`/product-details/${product.productId}`}>
                    <img src={product.image} className="product-image" alt={product.productName} />
                </Link>
                <div className="product-details">
                    <h3>{product.productName}</h3>
                    <div>
                        <span>Оценка: {product.rating}</span>
                        <span>({product.reviews} отзывов)</span>
                    </div>
                    <div className="cost">Цена: {product.price} руб.</div>
                    <div className="cart-controls">
                        <button className="counter-button" onClick={() => handleQuantityChange(-1)}>-</button>
                        <input type="number" min="1" value={quantity} readOnly />
                        <button className="counter-button" onClick={() => handleQuantityChange(1)}>+</button>
                        <button className="cart-button" onClick={handleAddToCart}>В корзину</button>
                    </div>
                </div> 
            </div>

            <div className="product-description">
                <h2>Описание товара</h2>
                <p>{product?.description}</p>
            </div>

            <div className="product-reviews">
                <h4>Написать отзыв</h4>
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <label key={star} className={star <= rating ? 'filled' : ''}>
                            <input
                                type="radio"
                                name="rating"
                                value={star}
                                checked={rating === star}
                                onChange={() => handleRatingChange(star)}
                            />
                        </label>
                    ))}
                </div>
                <textarea
                    className="review-textarea"
                    placeholder="Введите ваш отзыв"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
                <button className="submit-review-button" onClick={handleReviewSubmit}>
                    Отправить
                </button>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default ProductDetailsPage;
