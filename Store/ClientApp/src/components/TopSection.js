import React from 'react';
import { Link } from 'react-router-dom';
import './TopSection.css';
import sendRequest from './SendRequest';



class TopSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: null };
        this.singOut = this.singOut.bind(this);
    }
    componentDidMount() {
        sendRequest("/api/User/Check", "Get", null)
            .then(n => {this.setState({ user: n, }) }).catch(e => console.error(e))
    }


    singOut() {
        sendRequest("/api/User/singOut", "Post", null)
            .then(n => {this.setState({ user: null, }) }).catch(e => console.error(e))
    }

    render() {
        return (
            <div className="top-section">
                <div className="logo">
                    <img src="/images/qq.png" alt="Your Logo" />
                </div>
                <div className="phone-numbers">
                    <div>А1: +375 29 666 66 66</div>                   
                </div>
                <div className="vertical-line">|</div>
                <div className="text-content">
                    <div>Работаем без выходных</div>                    
                </div>
                <Link className="no-line" to="/user/CartPage">
                    <button className="cart-button-on-top-section">Корзина</button>
                </Link>
                
                {this.state.user && this.state.user.length > 0 ?
                (
                        <div className="auth-buttons">
                            <Link className="text-dark" to="/user/UserProfilePage">
                                <button>Мой профиль</button>
                            </Link>
                            <Link className="text-dark" to="/">
                                <button onClick={this.singOut}>Выход</button>
                            </Link>
                        </div>
                ) : (
                        <div className="auth-buttons">
                            <Link className="text-dark" to="/Authentication/RegisterPage">
                                <button>Регистрация</button>
                            </Link>
                            <Link className="text-dark" to="/Authentication/LoginPage">
                                <button>Авторизация</button>
                            </Link>
                        </div> 
                )}
                
            </div>
        );
    }
}

export default TopSection;
