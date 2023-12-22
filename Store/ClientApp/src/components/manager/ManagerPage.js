import React, { useState } from 'react';
import './AdminPage.css';
import Modal from './Modal';
import ProductModalContentAdd from './ProductModalContentAdd';
import ProductModalContentEdit from './ProductModalContentEdit';
import ProductModalContentRemove from './ProductModalContentRemove';
import CloseModal from './CloseModal';

const ManagerPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [mode, setMode] = useState(null);

    const openModal = (content, selectedMode) => {
        setModalContent(content);
        setMode(selectedMode);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setMode(null);
    };

    const renderAdminButtons = () => {
        switch (mode) {            
            case 'products':
                return (
                    <>
                        <button onClick={() => openModal(<ProductModalContentAdd />, 'add')}>Добавить</button>
                        <button onClick={() => openModal(<ProductModalContentEdit />, 'edit')}>Редактировать</button>
                        <button onClick={() => openModal(<ProductModalContentRemove />, 'delete')}>Удалить</button>
                    </>
                );  
            case 'orders history':
                return (
                    <>
                        <button onClick={() => openModal(<ProductModalContentAdd />, 'add')}>Добавить</button>
                        <button onClick={() => openModal(<ProductModalContentEdit />, 'edit')}>Редактировать</button>
                        <button onClick={() => openModal(<ProductModalContentRemove />, 'delete')}>Удалить</button>
                    </>
                );  
            case 'managing order statuses':
                return (
                    <>
                        <button onClick={() => openModal(<ProductModalContentAdd />, 'add')}>Добавить</button>
                        <button onClick={() => openModal(<ProductModalContentEdit />, 'edit')}>Редактировать</button>
                        <button onClick={() => openModal(<ProductModalContentRemove />, 'delete')}>Удалить</button>
                    </>
                );  
            default:
                return null;
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-menu">
                <h2>Панель менеджера</h2>
                <div className="admin-menu-button">
                    {!mode && <button onClick={() => openModal(<CloseModal />, 'products')}>Товары</button>}
                    {!mode && <button onClick={() => openModal(<CloseModal />, 'orders history')}>История заказо</button>}
                    {!mode && <button onClick={() => openModal(<CloseModal />, 'managing order statuses')}>Управление статусами заказов</button>}
                    {renderAdminButtons()}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} modalContent={modalContent} />
        </div>
    );
};

export default ManagerPage;
