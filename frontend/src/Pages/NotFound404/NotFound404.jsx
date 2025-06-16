import React from 'react';
import './NotFound404.css';

const NotFound404 = () => {
  return (
    <div className="notfound-container">
      <div className="space">
        <div className="planet"></div>
        <div className="astronaut"></div>
      </div>
      <div className="text">
        <h1>404</h1>
        <h2>Страница не найдена</h2>
        <p>Похоже, ты попал в космос... 🚀</p>
        <a href="/">Вернуться на Землю</a>
      </div>
    </div>
  );
};

export default NotFound404;
