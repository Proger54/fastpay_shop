import React, { useState, useEffect } from 'react';
import './Components.css';

import { checkPaymentStatus } from '../API/api';
import { useTranslation } from '../hooks/useTranslation';

const PaymentCardModal = ({ dataPayment, amount, onClose }) => {
  const [copiedField, setCopiedField] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(dataPayment?.status || 'Created');
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const { t } = useTranslation();

  // Расчет времени до истечения на основе expire и last_update
  useEffect(() => {
    if (dataPayment?.expire && dataPayment?.last_update) {
      const expireTime = new Date(dataPayment.expire).getTime();
      const lastUpdateTime = new Date(dataPayment.last_update).getTime();
      const currentTime = new Date().getTime();
      
      // Если last_update >= expire, то время истекло
      if (lastUpdateTime >= expireTime) {
        setIsExpired(true);
        setTimeLeft(0);
        return;
      }
      
      // Рассчитываем оставшееся время в секундах
      const remainingTime = Math.floor((expireTime - currentTime) / 1000);
      
      if (remainingTime <= 0) {
        setIsExpired(true);
        setTimeLeft(0);
      } else {
        setIsExpired(false);
        setTimeLeft(remainingTime);
      }
    } else {
      // Если данные о времени отсутствуют, показываем как истекшее
      setIsExpired(true);
      setTimeLeft(0);
    }
  }, [dataPayment]);

  // Таймер обратного отсчета
  useEffect(() => {
    if (timeLeft > 0 && !isExpired) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            setIsExpired(true);
            return 0;
          }
          return newTime;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isExpired]);

  // Форматирование времени в MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getCardType = (cardNumber) => {
    if (!cardNumber) return 'CARD';

    // Убираем все нецифровые символы
    const cleanNumber = cardNumber.replace(/\D/g, '');

    // Определяем тип карты по первым цифрам
    if (cleanNumber.startsWith('4')) return 'VISA';
    if (cleanNumber.startsWith('5')) return 'MASTERCARD';
    if (cleanNumber.startsWith('34') || cleanNumber.startsWith('37')) return 'AMEX';
    if (cleanNumber.startsWith('6')) return 'DISCOVER';
    if (cleanNumber.startsWith('35')) return 'JCB';
    if (cleanNumber.startsWith('62')) return 'UNIONPAY';
    if (cleanNumber.startsWith('22') || cleanNumber.startsWith('23') ||
      cleanNumber.startsWith('24') || cleanNumber.startsWith('25') ||
      cleanNumber.startsWith('26') || cleanNumber.startsWith('27')) return 'MIR';

    return 'CARD';
  };

  const copyToClipboard = async (text, fieldName) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Ошибка копирования:', err);
    }
  };

  const isCopied = (fieldName) => copiedField === fieldName;

  const checkStatus = async () => {
    setIsCheckingStatus(true);
    try {
      const result = await checkPaymentStatus({ payment_id: dataPayment.payment_id });
      console.log(result);
      setPaymentStatus(result.status);
      
      // Обновляем данные платежа, включая last_update
      if (result.last_update) {
        // Пересчитываем таймер с новыми данными
        const expireTime = new Date(dataPayment.expire).getTime();
        const lastUpdateTime = new Date(result.last_update).getTime();
        const currentTime = new Date().getTime();
        
        if (lastUpdateTime >= expireTime) {
          setIsExpired(true);
          setTimeLeft(0);
        } else {
          const remainingTime = Math.floor((expireTime - currentTime) / 1000);
          if (remainingTime <= 0) {
            setIsExpired(true);
            setTimeLeft(0);
          } else {
            setIsExpired(false);
            setTimeLeft(remainingTime);
          }
        }
      }

    } catch (error) {
      console.error('Ошибка при проверке статуса:', error);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const getStatusText = (status) => {
    console.log(status);
    switch (status) {
      case 'Approve':
      case 'AC':
        return t('payments.statuses.completed');
      case 'Created':
      case 'On pay':
      case 'CR':
      case 'OP':
        return t('payments.statuses.processing');
      case 'Cancel':
      case 'CL':
        return t('payments.statuses.error');
      default:
        return t('payments.statuses.unknown');
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approve':
      case 'AC':
        return 'status-completed';
      case 'Created':
      case 'On pay':
      case 'CR':
      case 'OP':
        return 'status-pending';
      case 'Cancel':
      case 'CL':
        return 'status-failed';
      default:
        return 'status-unknown';
    }
  };

  return (
    <div className="payment-card-modal-overlay">
      <div className="payment-card-modal-content">
        <div className="payment-card">
          <div className="card-header">
            <div className="card-bank">{dataPayment?.bank || dataPayment?.card?.bank}</div>
            <div className={`card-type card-type-${getCardType(dataPayment?.reqisite || dataPayment?.card?.card_number).toLowerCase()}`}>
              {getCardType(dataPayment?.reqisite || dataPayment?.card?.card_number)}
            </div>
          </div>

          <div
            className={`card-number ${isCopied('card_number') ? 'copied' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard(dataPayment?.reqisite || dataPayment?.card?.card_number, 'card_number');
            }}
            title="Кликните для копирования"
          >
            {dataPayment?.reqisite || dataPayment?.card?.card_number || '**** **** **** ****'}
            {isCopied('card_number') && <span className="copy-indicator">✓ Скопировано!</span>}
          </div>

          <div className="card-details">
            <div
              className={`card-holder ${isCopied('full_name') ? 'copied' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(dataPayment?.full_name || dataPayment?.card?.full_name, 'full_name');
              }}
              title="Кликните для копирования"
            >
              <span className="label">{t('modals.paymentCard.cardHolder')}</span>
              <span className="value">
                {dataPayment?.full_name || dataPayment?.card?.full_name || 'CARD HOLDER'}
                {isCopied('full_name') && <span className="copy-indicator">✓</span>}
              </span>
            </div>
            <div
              className={`card-expiry ${isCopied('amount') ? 'copied' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(`${amount} ${dataPayment.fiat}`, 'amount');
              }}
              title="Кликните для копирования"
            >
              <span className="label">{t('modals.paymentCard.amount')}</span>
              <span className="amount">
                {amount} {dataPayment.fiat || dataPayment.currency}
                {isCopied('amount') && <span className="copy-indicator">✓</span>}
              </span>
            </div>
          </div>

          <div className="card-footer">
            <div className="payment-status-section">
              <div className="status-display">
                <span className="label">{t('modals.paymentCard.status')}</span>
                <span className={`status-value ${getStatusClass(paymentStatus)}`}>
                  {getStatusText(paymentStatus)}
                </span>
              </div>
              {/* Показываем таймер только если платеж не завершен */}
              {paymentStatus !== 'Approve' && paymentStatus !== 'AC' && (
                <div className="timer-display">
                  <span className="label">{t('modals.paymentCard.time')}</span>
                  <span className={`timer-value ${
                    isExpired 
                      ? 'timer-expired' 
                      : timeLeft < 60 
                        ? 'timer-warning' 
                        : ''
                  }`}>
                  {isExpired 
                    ? (dataPayment?.expire && dataPayment?.last_update ? t('modals.paymentCard.expired') : t('modals.paymentCard.noData'))
                    : formatTime(timeLeft)
                  }
                  </span>
                </div>
              )}
            </div>

            <div
              className={`payment-id ${isCopied('payment_id') ? 'copied' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(dataPayment.payment_id, 'payment_id');
              }}
              title="Кликните для копирования"
            >
              <span className="label">{t('modals.paymentCard.paymentId')}</span>
              <span className="id">
                {dataPayment.payment_id}
                {isCopied('payment_id') && <span className="copy-indicator">✓</span>}
              </span>
            </div>
          </div>
        </div>

        <div className="card-instructions">
          <p>{t('modals.paymentCard.clickToCopy')}</p>
          <div className="action-buttons card-buttons">
            <button
              className="check-status-btn"
              onClick={(e) => {
                e.stopPropagation();
                checkStatus();
              }}
              disabled={isCheckingStatus}
            >
              {isCheckingStatus ? (
                <span className="loading-spinner"></span>
              ) : (
                t('modals.paymentCard.checkStatus')
              )}
            </button>
            <button className="close-card-btn" onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}>{t('modals.paymentCard.close')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCardModal;
