import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

import { fetchApi } from '../../API/api';

const ProfilePage = () => {
    const navigate = useNavigate();

    const [loadingInfo, setLoadingInfo] = useState(true);
    const [headerData, setHeaderData] = useState(null);

    useEffect(() => {
        const fetchInfo = async () => {
            setLoadingInfo(true);
            try {
                const result = await fetchApi({
                    url: `/api/v1/dashboard/info`,
                });
                setHeaderData(result);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            } finally {
                setLoadingInfo(true);
            }
        }

        fetchInfo();
    }, [])

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
        localStorage.removeItem('sp_name');
        localStorage.removeItem('sp_secretKey');
        localStorage.removeItem('sp_token');
        localStorage.removeItem('sp_type');
        navigate('/login');
    };

    const formatNumber = (number) => {
        if (number) {
            return number.toLocaleString('ru-RU', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }).replace(',', '.');
        }
        return number;
    }

    return (
        <div className="profile-container">
            <canvas className="stars-bg-canvas"></canvas>
            <header className="home-header">
                <div className="home-header-left" onClick={() => navigate('/')}>
                    <h2>{loadingInfo ? localStorage.getItem("sp_name") : headerData?.name}</h2>
                    <div className="home-balance">
                        <p>Баланс</p>
                        <span>{formatNumber(headerData?.balance)} USDT</span>
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
                    {headerData?.rates.map((item, index) => (
                        <div className="stat-item" key={index}>
                            <p>Ставка {item.mode} от {item.min} {item.currency}</p>
                            <span>{item.rate}%</span>
                        </div>
                    ))}
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                    Выйти из аккаунта
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
