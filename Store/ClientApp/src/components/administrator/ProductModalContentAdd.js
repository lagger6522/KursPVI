import React, { useState, useEffect } from 'react';
import sendRequest from '../SendRequest';
import './ProductModalContent.css';

const ProductModalContentAdd = ({ onClose }) => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');

    useEffect(() => {
        // Загрузка списка подкатегорий при монтировании компонента
        sendRequest('/api/Categories/GetSubcategories', 'GET')
            .then(response => {
                setSubcategories(response);
            })
            .catch(error => {
                console.error('Ошибка при загрузке подкатегорий:', error);
            });
    }, []);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            const imageURL = URL.createObjectURL(selectedImage);
            setImage(imageURL);
        }
    };

    const handleSave = () => {
        // Проверка, что подкатегория выбрана
        if (!selectedSubcategoryId) {
            console.error('Не выбрана подкатегория.');
            return;
        }

        // Отправка запроса на сервер для сохранения товара
        sendRequest('/api/Categories/CreateProduct', 'POST', {
            productName,
            description,
            image,
            price,
            availability,
            subcategoryId: selectedSubcategoryId,
        })
            .then(response => {
                // Обработка успешного ответа от сервера
                console.log('Товар успешно создан:', response);

                // Закрытие модального окна
                onClose();
            })
            .catch(error => {
                // Обработка ошибки при сохранении товара
                console.error('Ошибка при создании товара:', error);
            });
    };

    return (
        <div className="product-modal-content">
            <h3>Добавить товар</h3>
            <label htmlFor="productName">Название товара:</label>
            <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
            <label htmlFor="description">Описание:</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="image">Изображение:</label>
            <input
                type="file"
                id="image"
                onChange={handleImageChange}
                accept="image/*"
            />
            {image && (
                <div>
                    <p>Выбранное изображение:</p>
                    <img src={image} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </div>
            )}
            <label htmlFor="price">Цена:</label>
            <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="availability">Наличие:</label>
            <input
                type="text"
                id="availability"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
            />            
            <label htmlFor="subcategory">Подкатегория:</label>
            <select
                id="subcategory"
                value={selectedSubcategoryId}
                onChange={(e) => setSelectedSubcategoryId(e.target.value)}
            >
                <option value="">Выберите подкатегорию</option>
                {subcategories.map(subcategory => (
                    <option key={subcategory.subcategoryId} value={subcategory.subcategoryId}>
                        {subcategory.subcategoryName}
                    </option>
                ))}
            </select>
            <button onClick={handleSave}>Сохранить</button>
        </div>
    );
};

export default ProductModalContentAdd;
