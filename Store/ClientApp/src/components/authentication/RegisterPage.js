import React, { Component } from 'react';
import sendRequest from '../SendRequest';
import './RegisterPage.css';

export class RegisterPage extends Component {
    static displayName = RegisterPage.name;

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            errorMessage: null,
            Users: [],
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    componentDidMount() {
        this.GetAllUsers();
    }
    handleSubmit = async (event) => {
        event.preventDefault();

        const { name, email, phone, password, confirmPassword } = this.state;

        // Проверка наличия введенных данных
        if (!name || !email || !phone || !password || !confirmPassword) {
            this.setState({ errorMessage: 'Пожалуйста, заполните все поля' });
            return;
        }

        // Проверка валидности email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.setState({ errorMessage: 'Введите корректный адрес электронной почты' });
            return;
        }

        // Проверка валидности пароля
        if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            this.setState({
                errorMessage: 'Пароль должен содержать минимум 8 символов, включая буквы и цифры',
            });
            return;
        }

        if (password !== confirmPassword) {
            this.setState({ errorMessage: 'Пароли не совпадают' });
            return;
        }

        // Отправка данных на сервер
        sendRequest("/api/User/Register", "POST", { name, email, phone, password }, null)
            .then(n => { window.location.href = "/authentication/LoginPage" }).catch(error => {
                // Обработка ошибки и обновление состояния errorMessage
                this.setState({ errorMessage: error.message || "Произошла ошибка при входе. Пожалуйста, попробуйте снова." });
            });
    };  
    GetAllUsers() {
        sendRequest('/api/User/GetUsers', 'GET', null, null).then(n => { console.log(n); this.setState({ Users: n }) });        
    }
    render() {
        const { name, email, phone, password, confirmPassword, errorMessage, Users } = this.state;

        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <input
                        className="input"
                        type="text"
                        name="name"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={this.handleInputChange}
                    />
                    <input
                        className="input"
                        type="email"
                        name="email"
                        placeholder="Ваш e-mail"
                        value={email}
                        onChange={this.handleInputChange}
                    />
                    <input
                        className="input"
                        type="tel"
                        name="phone"
                        placeholder="Ваш телефон"
                        value={phone}
                        onChange={this.handleInputChange}
                    />
                    <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={this.handleInputChange}
                    />
                    <input
                        className="input"
                        type="password"
                        name="confirmPassword"
                        placeholder="Пароль еще раз"
                        value={confirmPassword}
                        onChange={this.handleInputChange}
                    />
                    <button className="btn" type="submit">
                        Регистрация
                    </button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
                
                {Users.map(n => <p>{JSON.stringify(n)}</p>)}
                {Users[0]?Users[0].username:null}
            </div>
        );
    }
}
