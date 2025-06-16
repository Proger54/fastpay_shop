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


export const requestOfficeToken = async ({ secretKey, code, onLogin, setIsLoading, navigate }) => {
    setIsLoading(true);
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
            onLogin();
            console.log('Успешный вход');
            navigate("/");
            return response.data;
        } else {
            throw new Error('Неверный ключ или код');
        }
    } catch (error) {
        console.error('Ошибка при запросе:', error);
        throw error;
    } finally {
        setIsLoading(false); 
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


// Добавление устройства
export const handleAddDevice = async ({ nameDevice }) => {
    try {
        const { auth, timestamp, token, type } = await AuthHeader();

        const response = await axios.post(
            '/api/v1/dashboard/device',
            { name: nameDevice }, // Тело запроса напрямую, без JSON.stringify
            {
                headers: {
                    "FP-Authorization": auth,
                    "FP-Timestamp": timestamp,
                    "FP-Token": token,
                    "FP-Type": type,
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = response.data;
        console.log(data);
        return data;

    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    }
};