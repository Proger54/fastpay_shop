import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

import PaginatedTable from '../../Components/PaginatedTable';
import CreatePaymentModal from '../../Components/CreatePaymentModal';

const HomePage = () => {
    const [modalCreateVisible, setModalCreateVisible] = useState(false);
    const [modalOutVisible, setModalOutVisible] = useState(false);
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


    const sampleData = [
        { id: '#001', rub: 1000, usdt: 10, status: 'success', statusName: 'Успешно' },
        { id: '#002', rub: 2000, usdt: 20, status: 'success', statusName: 'Успешно' },
        { id: '#003', rub: 1500, usdt: 15, status: 'pending', statusName: 'Ожидание' },
        { id: '#004', rub: 500, usdt: 5, status: 'failed', statusName: 'Ошибка' },
        { id: '#005', rub: 800, usdt: 8, status: 'success', statusName: 'Успешно' },
        { id: '#006', rub: 1200, usdt: 12, status: 'success', statusName: 'Успешно' },
        { id: '#007', rub: 300, usdt: 3, status: 'pending', statusName: 'Ожидание' },
        { id: '#001', rub: 1000, usdt: 10, status: 'success', statusName: 'Успешно' },
        { id: '#002', rub: 2000, usdt: 20, status: 'success', statusName: 'Успешно' },
        { id: '#003', rub: 1500, usdt: 15, status: 'pending', statusName: 'Ожидание' },
        { id: '#004', rub: 500, usdt: 5, status: 'failed', statusName: 'Ошибка' },
        { id: '#005', rub: 800, usdt: 8, status: 'success', statusName: 'Успешно' },
        { id: '#006', rub: 1200, usdt: 12, status: 'success', statusName: 'Успешно' },
        { id: '#007', rub: 300, usdt: 3, status: 'pending', statusName: 'Ожидание' },
    ];


    return (
        <div className="home-container">

            <canvas className="stars-bg-canvas"></canvas>

            <header className="home-header">
                <div className="home-header-left">
                    <h2>Магазин На Углу</h2>
                    <div className="home-balance">
                        <p>Баланс</p>
                        <span>98882 USDT</span>
                    </div>
                </div>
                <button className="home-profile-icon" aria-label="Профиль" onClick={() => navigate('/profile')}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="feather feather-user">
                        <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </button>
            </header>

            <div className="home-actions">
                <button className="action-button" onClick={() => setModalCreateVisible(true)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="feather feather-plus">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Создать платеж
                </button>
                <CreatePaymentModal visible={modalCreateVisible} onClose={() => setModalCreateVisible(false)} payIn={true} />

                <button className="action-button" onClick={() => setModalOutVisible(true)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="feather feather-log-out">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Запросить вывод
                </button>
                <CreatePaymentModal visible={modalOutVisible} onClose={() => setModalOutVisible(false)} payIn={false} />
            </div>

            <main className="home-main">
                <PaginatedTable data={sampleData} />
            </main>
        </div>
    );
};

export default HomePage;
