import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

import { fetchApi } from '../../API/api';

import PaginatedTable from '../../Components/PaginatedTable';
import CreatePaymentModal from '../../Components/CreatePaymentModal';

const HomePage = () => {
    const [modalCreateVisible, setModalCreateVisible] = useState(false);
    const [modalOutVisible, setModalOutVisible] = useState(false);
    const [loadingInfo, setLoadingInfo] = useState(true);
    const [headerData, setHeaderData] = useState(null);
    const [loadingPayment, setLoadingPayment] = useState(true);
    const [paymentData, setPaymentData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInfo = async () => {
            setLoadingInfo(true);
            try {
                const result = await fetchApi({
                    url: `/api/v1/dashboard/info`,
                });
                setHeaderData(result);
                localStorage.setItem("sp_name", result.name);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            } finally {
                setLoadingInfo(false);
            }
        }

        fetchInfo();
    }, [])

    useEffect(() => {
        const fetchPayment = async () => {
            setLoadingPayment(true);
            try {
                const result = await fetchApi({
                    url: `/api/v1/dashboard/payment/`,
                    params: { page: currentPage, page_size: 15 },
                });
                setPaymentData(result);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            } finally {
                setLoadingPayment(false);
            }
        }

        fetchPayment();
    }, [currentPage, modalCreateVisible])

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

    return (
        <div className="home-container">

            <canvas className="stars-bg-canvas"></canvas>

            <header className="home-header">
                <div className="home-header-left">
                    <h2>{loadingInfo ? localStorage.getItem("sp_name") : headerData?.name}</h2>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                    Выйти из аккаунта
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
                    Создать вывод
                </button>
                <CreatePaymentModal visible={modalOutVisible} onClose={() => setModalOutVisible(false)} payIn={false} />
            </div>

            <main className="home-main">
                {!loadingPayment && (
                    <PaginatedTable data={paymentData} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                )}
            </main>
        </div>
    );
};

export default HomePage;
