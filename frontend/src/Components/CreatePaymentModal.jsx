import React, { useState, useEffect } from 'react';
import './Components.css';

import { createPayment, createPayOut, getBanks, fetchApi } from '../API/api';
import PaymentCardModal from './PaymentCardModal';
import { useTranslation } from '../hooks/useTranslation';

export default function CreatePaymentModal({ visible, onClose, payIn }) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardError, setCardError] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [banks, setBanks] = useState([]);
  const [dataPayment, setDataPayment] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allowedMethods, setAllowedMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);

  // Загрузка списка банков (заглушка, замените на реальный API)
  useEffect(() => {
    const fetchBanks = async () => {
      const result = await getBanks();
      setBanks(result);
    }
    const fetchAllowedMethods = async () => {
      const url = `/api/v1/dashboard/merchant/${localStorage.getItem('sp_token')}/allowed`;
      const result = await fetchApi({ url: url, method: "GET" });
      setAllowedMethods(result);
      // Автоматически выбираем, если метод только один
      if (result && result.length === 1) {
        setSelectedMethod(result[0]);
      }
    }
    fetchBanks();
    fetchAllowedMethods();
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
      setCardError(t('createPaymentModal.cardTooShort'));
    } else if (cleanNumber.length > 19) {
      setCardError(t('createPaymentModal.cardTooLong'));
    } else if (!validateCardNumber(value)) {
      setCardError(t('createPaymentModal.invalidCard'));
    } else {
      setCardError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация для вывода
    if (!payIn) {
      if (!cardNumber.trim()) {
        setError(t('createPaymentModal.enterCardNumber'));
        return;
      }
      if (!validateCardNumber(cardNumber)) {
        setError(t('createPaymentModal.invalidCard'));
        return;
      }
      if (!selectedBank) {
        setError(t('createPaymentModal.selectBankError'));
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      if (payIn) {
        const result = await createPayment({ amount: Number(amount), typePay: selectedMethod?.mode || allowedMethods[0]?.mode, currency: selectedMethod?.currency || allowedMethods[0]?.currency });
        console.log(result);
        if (result?.payment_id) {
          setDataPayment(result);
        } else {
          throw new Error(t('createPaymentModal.paymentError'));
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
          throw new Error(t('createPaymentModal.withdrawalError'));
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.message || t('createPaymentModal.generalError'));
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
    setSelectedMethod(null);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={dataPayment ? null : handleClose}>
      {!dataPayment && (
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={handleClose} aria-label={t('createPaymentModal.close')}>&times;</button>
          <h3>{payIn ? t('createPaymentModal.createPayment') : t('createPaymentModal.createWithdrawal')}</h3>
          <form onSubmit={handleSubmit}>
            <div className="amount-input-container">
              <label className="amount-label">
                {t('createPaymentModal.amount')}
              </label>
              <div className="amount-input-wrapper">
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder={t('createPaymentModal.enterAmount')}
                  min="0"
                  step="0.01"
                  required
                  autoFocus
                  className="amount-input"
                />
                <span className="amount-currency">{selectedMethod?.currency}</span>
              </div>
            </div>
            
            {payIn && allowedMethods?.length > 0 && (
              <div className="payment-methods-container">
                <label className="methods-label">
                  {allowedMethods.length === 1
                    ? t('createPaymentModal.paymentMethod')
                    : t('createPaymentModal.selectPaymentMethod')}
                </label>

                {allowedMethods.length === 1 ? (
                  // Если метод один - просто показываем информацию
                  <div className="single-method-display">
                    <div className="method-info">
                      <span className="method-currency">{allowedMethods[0].mode}</span>
                      <span className="method-name">{allowedMethods[0].currency}</span>
                    </div>
                  </div>
                ) : (
                  // Если методов несколько - карточки с выбором
                  <div className="payment-methods-grid">
                    {allowedMethods.map(method => (
                      <div
                        key={method.id}
                        className={`payment-method-card ${selectedMethod === method.id ? 'selected' : ''
                          }`}
                        onClick={() => setSelectedMethod(method)}
                      >
                        <div className="method-card-content">
                          <div className="method-currency">{method.mode}</div>
                          <div className="method-name">{method.currency}</div>
                        </div>
                        {selectedMethod?.id === method.id && (
                          <div className="method-checkmark">✓</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {!payIn && (
              <div className="withdrawal-fields">
                <div className="styled-input-container">
                  <label className="styled-label">
                    {t('createPaymentModal.cardNumber')}
                  </label>
                  <div className={`styled-input-wrapper ${cardError ? 'error' : ''}`}>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder={t('createPaymentModal.cardPlaceholder')}
                      maxLength="19"
                      required
                      className="styled-input"
                    />
                  </div>
                  {cardError && <span className="field-error">{cardError}</span>}
                </div>

                <div className="styled-input-container">
                  <label className="styled-label">
                    {t('createPaymentModal.bank')}
                  </label>
                  <div className="styled-input-wrapper">
                    <select
                      value={selectedBank}
                      onChange={e => setSelectedBank(e.target.value)}
                      required
                      className="styled-select"
                    >
                      <option value="">{t('createPaymentModal.selectBank')}</option>
                      {banks?.banks?.map(bank => (
                        <option key={bank.name} value={bank.name}>
                          {bank.name_full}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            <button type="submit" className="modal-submit-button" disabled={loading}>
              {loading ? (
                <span className="loading-spinner loading-spinner-large"></span>
              ) : (
                t('createPaymentModal.confirm')
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
            <h3>{t('createPaymentModal.withdrawalCreated')}</h3>

            <div className="withdrawal-details">
              <div className="detail-item">
                <span className="label">{t('createPaymentModal.amountLabel')}</span>
                <span className="value">{amount} AZN</span>
              </div>

              <div className="detail-item">
                <span className="label">{t('createPaymentModal.cardNumberLabel')}</span>
                <span className="value">{cardNumber}</span>
              </div>

              <div className="detail-item">
                <span className="label">{t('createPaymentModal.bankLabel')}</span>
                <span className="value">
                  {banks?.banks?.find(bank => bank.name === selectedBank)?.name_full || selectedBank}
                </span>
              </div>

              <div className="detail-item">
                <span className="label">{t('createPaymentModal.requestIdLabel')}</span>
                <span className="value payment-id">{dataPayment.id}</span>
              </div>
            </div>

            <div className="withdrawal-instructions">
              <p>{t('createPaymentModal.withdrawalInstructions')}</p>
              <p>{t('createPaymentModal.withdrawalTime')}</p>
            </div>

            <button className="close-card-btn" onClick={handleClose}>
              {t('createPaymentModal.close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
