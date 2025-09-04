import React, { useState, useEffect } from 'react';
import './Components.css';

import { createPayment, createPayOut, getBanks } from '../API/api';
import PaymentCardModal from './PaymentCardModal';

export default function CreatePaymentModal({ visible, onClose, payIn }) {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardError, setCardError] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [banks, setBanks] = useState([]);
  const [dataPayment, setDataPayment] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Загрузка списка банков (заглушка, замените на реальный API)
  useEffect(() => {
    const fetchBanks = async () => {
      const result = await getBanks();
      setBanks(result);
    }
    fetchBanks();
  }, []);

  if (!visible) return null;

  // Валидация номера карты (алгоритм Луна)
  const validateCardNumber = (cardNumber) => {
    const cleanNumber = cardNumber.replace(/\D/g, '');
    if (cleanNumber.length < 13 || cleanNumber.length > 19) return false;

    let sum = 0;
    let isEven = false;

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  // Проверка карты в реальном времени
  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    const formatted = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);

    const cleanNumber = value.replace(/\D/g, '');

    if (cleanNumber.length === 0) {
      setCardError('');
    } else if (cleanNumber.length < 13) {
      setCardError('Номер карты слишком короткий');
    } else if (cleanNumber.length > 19) {
      setCardError('Номер карты слишком длинный');
    } else if (!validateCardNumber(value)) {
      setCardError('Неверный номер карты');
    } else {
      setCardError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация для вывода
    if (!payIn) {
      if (!cardNumber.trim()) {
        setError('Введите номер карты');
        return;
      }
      if (!validateCardNumber(cardNumber)) {
        setError('Неверный номер карты');
        return;
      }
      if (!selectedBank) {
        setError('Выберите банк');
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      if (payIn) {
        const result = await createPayment({ amount: Number(amount), typePay: "C2C" });
        console.log(result);
        if (result?.payment_id) {
          setDataPayment(result);
        } else {
          throw new Error('Ошибка при создании платежа');
        }
      } else {
        const result = await createPayOut({
          amount: Number(amount),
          cardNumber: cardNumber.replace(/\D/g, ''),
          bank: selectedBank
        });
        console.log(result);
        if (result?.id) {
          setDataPayment(result);
        } else {
          throw new Error('Ошибка при создании вывода');
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };



  const handleClose = () => {
    setAmount("");
    setCardNumber("");
    setCardError("");
    setSelectedBank("");
    setDataPayment(null);
    setError(null);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={dataPayment ? null : handleClose}>
      {!dataPayment && (
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={handleClose} aria-label="Закрыть">&times;</button>
          <h3>{payIn ? "Создать платеж" : "Создать вывод"}</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Сумма:
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Введите сумму"
                min="0"
                step="0.01"
                required
                autoFocus
              />
            </label>

            {!payIn && (
              <div className="withdrawal-fields">
                <label>
                  Номер карты:
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                    className={cardError ? 'error' : ''}
                  />
                  {cardError && <span className="field-error">{cardError}</span>}
                </label>

                <label>
                  Банк:
                  <select
                    value={selectedBank}
                    onChange={e => setSelectedBank(e.target.value)}
                    required
                  >
                    <option value="">Выберите банк</option>
                    {banks?.banks?.map(bank => (
                      <option key={bank.name} value={bank.name}>
                        {bank.name_full}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            <button type="submit" className="action-button" disabled={loading}>
              {loading ? (
                <span className="loading-spinner loading-spinner-large"></span>
              ) : (
                'Подтвердить'
              )}
            </button>
          </form>
        </div>
      )}
      {dataPayment && payIn && (
        <PaymentCardModal
          dataPayment={dataPayment}
          amount={amount}
          onClose={handleClose}
        />
      )}
      {dataPayment && !payIn && (
        <div className="withdrawal-success-modal">
          <div className="withdrawal-success-content">
            <h3>Заявка на вывод создана!</h3>

            <div className="withdrawal-details">
              <div className="detail-item">
                <span className="label">Сумма:</span>
                <span className="value">{amount} AZN</span>
              </div>

              <div className="detail-item">
                <span className="label">Номер карты:</span>
                <span className="value">{cardNumber}</span>
              </div>

              <div className="detail-item">
                <span className="label">Банк:</span>
                <span className="value">
                  {banks?.banks?.find(bank => bank.name === selectedBank)?.name_full || selectedBank}
                </span>
              </div>

              <div className="detail-item">
                <span className="label">ID заявки:</span>
                <span className="value payment-id">{dataPayment.id}</span>
              </div>
            </div>

            <div className="withdrawal-instructions">
              <p>Ваша заявка на вывод принята и находится в обработке.</p>
              <p>Деньги будут зачислены на указанную карту в течение 1 часа.</p>
            </div>

            <button className="close-card-btn" onClick={handleClose}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
