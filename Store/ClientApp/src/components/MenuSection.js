import React, { useState, useEffect } from 'react';
import sendRequest from './SendRequest';
import './MenuSection.css';

const MenuSection = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allProducts, setAllProducts] = useState([]); // Допустим, у вас есть все товары в этом состоянии
    const [searchEmpty, setSearchEmpty] = useState(false);

    useEffect(() => {
        sendRequest('/api/Categories/GetProducts', 'GET')
            .then(data => {
                setAllProducts(data);
            })
            .catch(error => {
                console.error('Ошибка загрузки каталога:', error);
            });
    }, []);


    const handleSearch = () => {
        // Если поисковый запрос пуст
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setSearchEmpty(true);
            return;
        }

        // Фильтрация товаров по поисковому запросу
        const filteredProducts = allProducts.filter((product) =>
            product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSearchResults(filteredProducts);
        setSearchEmpty(false);
    };

    return (
        <div className="menu-section">
            <div className="menu-buttons">
                <button>Каталог товаров</button>
                <button>Оплата и доставка</button>
                <button>Контакты</button>
                <button>О нас</button>
            </div>
            <div className="search-menu">
                <input
                    type="text"
                    placeholder="Поиск по каталогу"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Найти</button>
            </div>

            {searchEmpty && <p>Поисковый запрос пуст. </p>}

            {searchResults.length > 0 && (
                <div className="search-results">
                    <h2>Результаты поиска:</h2>
                    <ul>
                        {searchResults.map((product) => (
                            <li key={product.productId}>{product.productName}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MenuSection;
