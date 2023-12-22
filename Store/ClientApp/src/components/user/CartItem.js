import React from 'react';
import './CartItem.css';

const CartItem = ({ product, quantity, handleQuantityChange, handleRemoveFromCart }) => {
    const total = product.price * quantity;

    return (
        <div className="cart-item">
            <div className="item-image">
                <img src={product.image} alt={product.productName} />
            </div>
            <div className="item-details">
                <h3>{product.productName}</h3>
                <p>Цена: {product.price} руб.</p>
                <div className="cart-controls">
                    <button className="counter-button" onClick={() => handleQuantityChange(product.productId, quantity - 1)}>
                        -
                    </button>
                    <input type="number" min="1" value={quantity} onChange={(e) => handleQuantityChange(product.productId, e.target.value)} />
                    <button className="counter-button" onClick={() => handleQuantityChange(product.productId, quantity + 1)}>
                        +
                    </button>
                    <p>Итого: {total} руб.</p>
                    <button className="remove-button" onClick={() => handleRemoveFromCart(product.productId)}>
                        Удалить из корзины
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
