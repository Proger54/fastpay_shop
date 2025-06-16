import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

import { requestOfficeToken } from '../../API/api';

import LoginSvg from '../../assets/secure-login.svg';

const LoginPage = () => {
    const [secret, setSecret] = useState('');
    const [code, setCode] = useState(Array(6).fill(''));
    const [isLoading, setIsLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const navigate = useNavigate();
    const inputRefs = useRef([]);

    const handleCodeChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const fullCode = code.join('');
        if (secret && fullCode.length === 6) {
            try {
                await requestOfficeToken({ secretKey: secret, code: fullCode });
                setLoginSuccess(true);
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            } catch (err) {
                console.log('Полная ошибка:', err.response);
                console.log('Данные ответа сервера:', err.response?.data);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className={`auth-container ${loginSuccess ? 'auth-fade' : ''}`}>
            <div className="auth-header-svg">
                <img src={LoginSvg} alt="Secure login" className="auth-svg-static" />
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Вход</h1>

                <label>
                    Секретный ключ
                    <input
                        type="password"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                        required
                    />
                </label>

                <label>
                    2FA Код
                    <div className="auth-code-inputs">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleCodeChange(index, e.target.value)}
                                onKeyDown={(e) => handleBackspace(index, e)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="auth-code-digit"
                                required
                            />
                        ))}
                    </div>
                </label>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <span className="auth-loader" />
                    ) : (
                        'Войти'
                    )}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
