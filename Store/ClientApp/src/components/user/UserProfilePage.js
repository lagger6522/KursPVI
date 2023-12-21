import React, { useState, useEffect } from 'react';
import './UserProfilePage.css';
import sendRequest from '../SendRequest';

const UserProfilePage = () => {


    var userName = sessionStorage.getItem("userName");
    var number = sessionStorage.getItem("number");
    var email = sessionStorage.getItem("email");


    return (
        <div className="user-profile-page">
            <div className="user-profile">
                <h2>Данные пользователя</h2>
                <div>
                    <strong>Имя пользователя:</strong> {userName}
                </div>
                <div>
                    <strong>E-mail:</strong> {email}
                </div>
                <div>
                    <strong>Телефон:</strong> {number}
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
