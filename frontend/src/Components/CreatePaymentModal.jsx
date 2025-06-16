import React, { useState } from 'react';
import './Components.css';

export default function CreatePaymentModal({ visible, onClose, payIn }) {
  const [amount, setAmount] = useState('');

  if (!visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // тут позже можешь добавить обработку суммы
    alert(`Сумма: ${amount}`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">&times;</button>
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
    </div>
  );
}
