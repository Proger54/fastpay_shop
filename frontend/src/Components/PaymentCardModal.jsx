import React, { useState } from 'react';
import './Components.css';

import { checkPaymentStatus } from '../API/api';

const PaymentCardModal = ({ dataPayment, amount, onClose }) => {
  const [copiedField, setCopiedField] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(dataPayment?.status || 'Created');
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

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
        return 'Завершен';
      case 'Created':
      case 'On pay':
        return 'В обработке';
      case 'Cancel':
        return 'Ошибка';
      default:
        return 'Неизвестно';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approve':
        return 'status-completed';
      case 'Created':
      case 'On pay':
        return 'status-pending';
      case 'Cancel':
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
            <div className="card-bank">{dataPayment.bank}</div>
            <div className={`card-type card-type-${getCardType(dataPayment.reqisite).toLowerCase()}`}>
              {getCardType(dataPayment.reqisite)}
            </div>
          </div>
          
          <div 
            className={`card-number ${isCopied('card_number') ? 'copied' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard(dataPayment.reqisite, 'card_number');
            }}
            title="Кликните для копирования"
          >
            {dataPayment.reqisite || '**** **** **** ****'}
            {isCopied('card_number') && <span className="copy-indicator">✓ Скопировано!</span>}
          </div>
          
          <div className="card-details">
            <div 
              className={`card-holder ${isCopied('full_name') ? 'copied' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(dataPayment.full_name, 'full_name');
              }}
              title="Кликните для копирования"
            >
              <span className="label">CARD HOLDER</span>
              <span className="value">
                {dataPayment.full_name || 'CARD HOLDER'}
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
              <span className="label">AMOUNT</span>
              <span className="amount">
                {amount} {dataPayment.fiat}
                {isCopied('amount') && <span className="copy-indicator">✓</span>}
              </span>
            </div>
          </div>
          
          <div className="card-footer">
            <div className="payment-status-section">
              <div className="status-display">
                <span className="label">Статус:</span>
                <span className={`status-value ${getStatusClass(paymentStatus)}`}>
                  {getStatusText(paymentStatus)}
                </span>
              </div>
            </div>
            
            <div 
              className={`payment-id ${isCopied('payment_id') ? 'copied' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(dataPayment.payment_id, 'payment_id');
              }}
              title="Кликните для копирования"
            >
              <span className="label">ID платежа:</span>
              <span className="id">
                {dataPayment.payment_id}
                {isCopied('payment_id') && <span className="copy-indicator">✓</span>}
              </span>
            </div>
          </div>
        </div>
        
        <div className="card-instructions">
          <p>Кликните на любой текст для копирования</p>
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
                'Проверить статус'
              )}
            </button>
            <button className="close-card-btn" onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}>Закрыть</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCardModal;
