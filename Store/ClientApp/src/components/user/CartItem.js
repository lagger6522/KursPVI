import React from 'react';
import './CartItem.css';

const CartItem = ({ product, quantity, handleQuantityChange, handleRemoveFromCart }) => {
    const total = product.price * quantity;

    return (
        <div className="cart-item">
            <div className="item-column1">
                <img src={product.image} />
                <span>{product.productName}</span>
            </div>
            <div className="item-column2">
                <p>{product.price} руб.</p>
            </div>
            <div className="item-column3">
                <button className="counter-button" onClick={() => handleQuantityChange(product.productId, quantity - 1)}>
                    -
                </button>
                <input type="number" min="1" value={quantity} onChange={(e) => handleQuantityChange(product.productId, e.target.value)} />
                <button className="counter-button" onClick={() => handleQuantityChange(product.productId, quantity + 1)}>
                    +
                </button>
            </div>
            {/*    <div className="detail">*/}
            {/*        <span>Количество:</span>*/}
                    
            {/*    </div>*/}
            {/*    <div className="detail">*/}
            {/*        <span>Сумма:</span>*/}
            {/*        <p>{total} руб.</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<button className="remove-button" onClick={() => handleRemoveFromCart(product.productId)}>*/}
            {/*    Удалить из корзины*/}
            {/*</button>*/}
        </div>
    );
};

export default CartItem;
