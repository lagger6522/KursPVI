import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import sendRequest from '../SendRequest';
import './style.css';

const SubcategoryModalContentEdit = ({ onClose }) => {
    const [subcategoryName, setSubcategoryName] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        sendRequest('/api/Categories/GetSubcategories', 'GET', null, null)
            .then(response => {
                setSubcategories(response);
            })
            .catch(error => {
                console.error('Ошибка при загрузке подкатегорий:', error);
            });
    }, []);

    const handleSubcategoryChange = (selectedSubcategoryId) => {
        const subcategory = subcategories.find(subcategory => subcategory.subcategoryId === parseInt(selectedSubcategoryId, 10));
        setSelectedSubcategory(subcategory);
        setSubcategoryName(subcategory ? subcategory.subcategoryName : '');
    };

    const handleSave = () => {
        if (selectedSubcategory) {
            sendRequest(`/api/Categories/EditSubcategory`, 'PUT', { subcategoryName }, { subcategoryId: selectedSubcategory.subcategoryId } )
                .then(response => {
                    console.log('Подкатегория успешно обновлена:', response);

                    sendRequest('/api/Categories/GetSubcategories', 'GET', null, null)
                        .then(updatedSubcategories => {
                            setSubcategories(updatedSubcategories);
                        })
                        .catch(error => {
                            console.error('Ошибка при загрузке подкатегорий после обновления:', error);
                        });
                })
                .catch(error => {
                    console.error('Ошибка при обновлении подкатегории:', error);
                });
        }
    };

    return (
        <div className="align-column">
            <h3>Редактировать подкатегорию</h3>
            <label htmlFor="selectedSubcategory">Выберите подкатегорию:</label>
            <select
                id="selectedSubcategory"
                value={selectedSubcategory ? selectedSubcategory.subcategoryId : ''}
                onChange={(e) => handleSubcategoryChange(e.target.value)}
            >
                <option value="" disabled>Выберите подкатегорию</option>
                {subcategories.map(subcategory => (
                    <option key={subcategory.subcategoryId} value={subcategory.subcategoryId}>{subcategory.subcategoryName}</option>
                ))}
            </select>
            <label htmlFor="subcategoryName">Новое название подкатегории:</label>
            <input
                type="text"
                id="subcategoryName"
                value={subcategoryName}
                onChange={(e) => setSubcategoryName(e.target.value)}
            />
            <button onClick={handleSave}>Сохранить</button>
        </div>
    );
};

SubcategoryModalContentEdit.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default SubcategoryModalContentEdit;
