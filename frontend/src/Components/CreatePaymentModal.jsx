import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './Components.css';

import { createPayment } from '../API/api';

export default function CreatePaymentModal({ visible, onClose, payIn }) {
  const [amount, setAmount] = useState('');
  const [payLink, setPayLink] = useState(null);

  if (!visible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createPayment({ amount: Number(amount), typePay: "SBP" });
      console.log(result);
      setPayLink(result.payment_url);
    } catch (err) {
      console.error(err);
    }

  };

  const handleClose = () => {
    setAmount("");
    setPayLink(null);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      {!payLink && (
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={handleClose} aria-label="Закрыть">&times;</button>
          <h3>{payIn ? "Создать платеж" : "Запросить вывод"}</h3>
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
            <button type="submit" className="action-button">Подтвердить</button>
          </form>
        </div>
      )}
      {payLink && (
        <div className="qr-wrapper">
          <QRCodeSVG value={payLink} size={300} />
          <p className="qr-instruction">Нажмите в любое место, чтобы закрыть</p>
        </div>
      )}
    </div>
  );
}
