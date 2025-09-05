// api.js
import axios from 'axios';
import CryptoJS from 'crypto-js';

/**
 * Универсальная функция для выполнения API-запросов
 * @param {Object} options - Конфигурация запроса
 * @param {string} options.url - URL-адрес запроса
 * @param {string} [options.method='GET'] - Метод запроса (GET, POST и т.д.)
 * @param {Object} [options.data] - Тело запроса (для POST)
 * @param {Object} [options.params] - Параметры запроса (для GET, например, page)
 * @returns {Promise<any>} - Данные ответа
 */

// Функция для генерации заголовков авторизации
export const AuthHeader = async () => {
    try {
        const token = localStorage.getItem('sp_token');
        const secretKey = localStorage.getItem('sp_secretKey');
        const type = localStorage.getItem('sp_type');

        const timestamp = Math.floor(Date.now() / 1000).toString();
        const dataToAuth = `${token}${timestamp}${type}`;
        const auth = CryptoJS.HmacSHA256(dataToAuth, secretKey).toString(CryptoJS.enc.Hex);

        return {
            auth,
            timestamp,
            token,
            type,
        };
    } catch (error) {
        console.error('Ошибка при генерации заголовка авторизации:', error);
        throw error;
    }
};


export const requestOfficeToken = async ({ secretKey, code }) => {
    try {
        const timestamp = Math.floor(Date.now() / 1000);
        const method = "PUT";
        const path = "/api/v1/dashboard/login";
        const data = `${timestamp}:${method}:${path}`;
        const signature = CryptoJS.HmacSHA256(data, secretKey).toString();

        console.log('Request data:', {
            secretKey,
            code,
            timestamp,
            signature,
            path,
            method,
            dataToSign: data,
        });

        const response = await axios({
            url: path,
            method: method,
            data: { code },
            headers: {
                "FP-Authorization": signature,
                "FP-Timestamp": timestamp.toString(),
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 202) {
            const { token, type } = response.data;
            localStorage.setItem('sp_secretKey', secretKey);
            localStorage.setItem('sp_token', token);
            localStorage.setItem('sp_type', type);
            console.log('Успешный вход');
            return response.data;
        } else {
            throw new Error('Неверный ключ или код');
        }
    } catch (error) {
        console.error('Ошибка при запросе:', error);
        throw error;
    }
};

export const fetchApi = async ({
    url,
    method = 'GET',
    data = {},
    params = {},
} = {}) => {
    try {
        const { auth, timestamp, token, type } = await AuthHeader();

        const response = await axios({
            method,
            url,
            data, // Тело запроса для POST
            params, // Параметры для GET (например, ?page=1)
            headers: {
                'FP-Authorization': auth,
                'FP-Timestamp': timestamp,
                'FP-Token': token,
                'FP-Type': type,
                ...((method === 'POST' || method === "PUT") && { 'Content-Type': 'application/json' }), // Добавляем Content-Type только для POST
            },
        });

        return response.data;
    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    }
};


export const createPayment = async ({ amount, typePay }) => {
    const token = localStorage.getItem('sp_token');
    const secretKey = localStorage.getItem('sp_secretKey');
    const timestamp = Math.floor(Date.now() / 1000).toString();

    const dataToSign = `${token}${timestamp}`;

    const crypto = require('crypto-js');
    const signature = crypto.HmacSHA256(dataToSign, secretKey).toString(crypto.enc.Hex);

    const method = "POST";
    const url = "/api/v1/merch/create/pay";
    const data = {
        amount: amount,
        type_pay: typePay,
        result_url: "https://ya.ru",
        currency: "AZN",
        unique: true
    }
    const params = {}

    const response = await axios({
        method,
        url,
        data,
        params,
        headers: {
            'FP-Signature': signature,
            'FP-Timestamp': timestamp,
            'FP-Token': token,
            ...((method === 'POST' || method === "PUT") && { 'Content-Type': 'application/json' }),
        },
    });

    return response.data;
}

export const createPayOut = async ({ amount, cardNumber, bank }) => {
    const token = localStorage.getItem('sp_token');
    const secretKey = localStorage.getItem('sp_secretKey');
    const timestamp = Math.floor(Date.now() / 1000).toString();

    const dataToSign = `${token}${timestamp}`;

    const crypto = require('crypto-js');
    const signature = crypto.HmacSHA256(dataToSign, secretKey).toString(crypto.enc.Hex);

    const method = "POST";
    const url = "/api/v1/merch/create/payout";
    const data = {
        amount: amount,
        type: "C2C",
        currency: "AZN",
        requisite: cardNumber,
        bank: bank
    }
    const params = {}

    const response = await axios({
        method,
        url,
        data,
        params,
        headers: {
            'FP-Signature': signature,
            'FP-Timestamp': timestamp,
            'FP-Token': token,
            ...((method === 'POST' || method === "PUT") && { 'Content-Type': 'application/json' }),
        },
    });

    return response.data;
}

export const getBanks = async () => {
    const token = localStorage.getItem('sp_token');
    const secretKey = localStorage.getItem('sp_secretKey');
    const timestamp = Math.floor(Date.now() / 1000).toString();

    const dataToSign = `${token}${timestamp}`;

    const crypto = require('crypto-js');
    const signature = crypto.HmacSHA256(dataToSign, secretKey).toString(crypto.enc.Hex);

    const method = "GET";
    const url = "/api/v1/merch/banks?currency=AZN";
    const data = {}
    const params = {}

    const response = await axios({
        method,
        url,
        data,
        params,
        headers: {
            'FP-Signature': signature,
            'FP-Timestamp': timestamp,
            'FP-Token': token,
            ...((method === 'POST' || method === "PUT") && { 'Content-Type': 'application/json' }),
        },
    });

    return response.data;

}

export const checkPaymentStatus = async ({ payment_id }) => {
    const token = localStorage.getItem('sp_token');
    const secretKey = localStorage.getItem('sp_secretKey');
    const timestamp = Math.floor(Date.now() / 1000).toString();

    const dataToSign = `${token}${timestamp}`;

    const crypto = require('crypto-js');
    const signature = crypto.HmacSHA256(dataToSign, secretKey).toString(crypto.enc.Hex);

    const method = "GET";
    const url = "/api/v1/merch/status/payin/" + payment_id;
    const data = {}
    const params = {}

    const response = await axios({
        method,
        url,
        data,
        params,
        headers: {
            'FP-Signature': signature,
            'FP-Timestamp': timestamp,
            'FP-Token': token,
            ...((method === 'POST' || method === "PUT") && { 'Content-Type': 'application/json' }),
        },
    });

    return response.data;

}
