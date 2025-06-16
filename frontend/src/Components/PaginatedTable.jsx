import React, { useState } from 'react';
import './Components.css';

import CopyNotification from './CopyNotification';

import { ReactComponent as CopyIcon } from '../assets/copy-id.svg';

const PaginatedTable = ({ data, itemsPerPage = 5, currentPage, setCurrentPage }) => {
    const [copied, setCopied] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);
    const totalPages = data?.total_pages;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const truncateString = (str) => {
        if (!str) return '';
        return str.length > 7 ? str.slice(0, 7) + '...' : str;
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Скопировано:', text);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch (err) {
            console.error('Ошибка копирования:', err);

            // Фоллбэк для старых браузеров
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();

            try {
                document.execCommand('copy');
                console.log('Скопировано (fallback):', text);
                setCopied(true);
                console.log(copied);
                setTimeout(() => setCopied(false), 3000);
                console.log(copied);
            } catch (err) {
                console.error('Не удалось скопировать (fallback):', err);
            }

            document.body.removeChild(textarea);
        }
    };

    const statusClass = (status) => {
        switch (status) {
            case "AC":
                return 'success';
            case "CL":
                return 'error';
            default:
                return 'pending';
        }
    }

    const statusText = (status) => {
        switch (status) {
            case "AC":
                return 'Успешно';
            case "CL":
                return 'Ошибка';
            default:
                return 'Оплата';
        }
    }

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
        <div className="table-wrapper">
            <CopyNotification visible={copied} />
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Номер</th>
                        <th>Сумма</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.results.map((item, index) => (
                        <tr key={index}>
                            <td className='row-id'>
                                <p>{truncateString(item.payment_id)}</p>
                                <div className="areaSvg" onClick={() => copyToClipboard(item.payment_id)}>
                                    <CopyIcon />
                                </div>
                            </td>
                            <td>
                                <p className="rub">{formatNumber(item.amount)} RUB</p>
                                <p className="usdt">{formatNumber(item.amount_usdt)} USDT</p>
                            </td>
                            <td className={`status ${statusClass(item.status)}`}>{statusText(item.status)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    ←
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={currentPage === i + 1 ? 'active' : ''}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}

                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    →
                </button>
            </div>
        </div>
    );
};

export default PaginatedTable;
