import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import sendRequest from './SendRequest';

const ProductPage = () => {
    const location = useLocation();
    const { state } = location;
    const subcategory = state?.subcategory;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (subcategory) {
            sendRequest('/api/Categories/GetProductsBySubcategory', 'GET', null, {subcategoryId:subcategory.subcategoryId})
                .then(products => {                    
                    setProducts(products);
                })
                .catch(error => {
                    console.error('Ошибка при получении товаров:', error);
                });
        }
    }, [subcategory]);

    return (
        <div>
            <h1>Product Page</h1>
            <div>
                {products.map((product) => (
                    <div key={product.productId}>
                        <h2>{product.productName}</h2>
                        <img src={product.image} alt={product.productName} />
                        <p>{product.description}</p>
                        <p>Price: {product.price}</p>
                        <p>Availability: {product.availability}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
