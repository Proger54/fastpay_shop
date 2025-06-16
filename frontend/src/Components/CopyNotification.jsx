import React, { useEffect, useState } from 'react';
import './Components.css';

const CopyNotification = ({ visible, text }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        console.log("отображаем сообщение")
        if (visible) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    return (
        <div className={`copy-toast ${show ? 'show' : ''}`}>
            {text || 'Скопировано в буфер!'}
        </div>
    );
};

export default CopyNotification;
