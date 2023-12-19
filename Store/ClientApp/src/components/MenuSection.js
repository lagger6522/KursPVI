import React from 'react';
import './MenuSection.css';

const MenuSection = () => {
    return (
        <div className="menu-section">
            <div className="menu-buttons">
                <button>Каталог товаров</button>
                <button>Оплата и доставка</button>
                <button>Контакты</button>
                <button>О нас</button>
            </div>
            <div className="search-menu">
                <input type="text" placeholder="Поиск по каталогу" />
                <button>Найти</button>
            </div>
        </div>
    );
};

export default MenuSection;
