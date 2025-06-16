import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css'; // стили смотри ниже

const ProfilePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const canvas = document.querySelector(".stars-bg-canvas");
        const ctx = canvas.getContext("2d");
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let stars = Array.from({ length: 100 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.3 + 0.1
        }));

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "#b5b5b5";

            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        const update = () => {
            stars.forEach(star => {
                star.y += star.speed;
                if (star.y > height) {
                    star.y = 0;
                    star.x = Math.random() * width;
                }
            });
        };

        const animate = () => {
            update();
            draw();
            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
        // Очистка токена / переход на страницу входа
        console.log('Выход выполнен');
        // Пример:
        // localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="profile-container">
            <canvas className="stars-bg-canvas"></canvas>
            <header className="home-header">
                <div className="home-header-left" onClick={() => navigate('/')}>
                    <h2>Магазин На Углу</h2>
                    <div className="home-balance">
                        <p>Баланс</p>
                        <span>98882 USDT</span>
                    </div>
                </div>
                <button className="home-profile-icon" aria-label="Профиль">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="feather feather-user">
                        <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </button>
            </header>

            <div className="profile-content">
                <h3>Профиль пользователя</h3>

                <div className="stats-box">
                    <div className="stat-item">
                        <p>Ставка комиссии</p>
                        <span>12%</span>
                    </div>
                    <div className="stat-item">
                        <p>Всего операций</p>
                        <span>48</span>
                    </div>
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                    Выйти из аккаунта
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
