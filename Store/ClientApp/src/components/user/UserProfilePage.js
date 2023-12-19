import React from 'react';
import './UserProfilePage.css';

const UserProfilePage = () => {
    return (
        <div className="user-profile-page">
            <div className="user-profile">
                <h2>Данные пользователя</h2>
                <div>
                    <strong>Имя пользователя:</strong> John Doe
                </div>
                <div>
                    <strong>E-mail:</strong> john.doe@example.com
                </div>
                <div>
                    <strong>Телефон:</strong> +1234567890
                </div>
            </div>
            <div className="user-menu">
                <button>Личный кабинет</button>
                <button>Изменить пароль</button>
                <button>Мои заказы</button>
            </div>
        </div>
    );
};

export default UserProfilePage;
