#!/bin/bash

# Остановка выполнения при ошибке
set -e

SERVER_USER="root"  # Имя пользователя на сервере
SERVER_IP="109.107.157.184"  # IP-адрес сервера
PROJECT_DIR="/var/new/3ds-payment.ru"  # Папка, где будет храниться фронт
NGINX_CONF="/etc/nginx/sites-available/app.3ds-payment.ru"  # Путь к конфигу Nginx

echo "⏳ Подключаемся к серверу и настраиваем деплой..."

echo "📂 Создаем папку проекта..."
ssh $SERVER_USER@$SERVER_IP "mkdir -p $PROJECT_DIR"
echo "📂 Создали папку проекта"

echo "📦 Загружаем весь проект в папку проекта"
rsync -av --exclude 'node_modules' --exclude '.git' --exclude '.github' ./frontend/ $SERVER_USER@$SERVER_IP:$PROJECT_DIR/
rsync -av --exclude 'node_modules' --exclude '.git' --exclude '.github' ./docker/nginx/site.conf $SERVER_USER@$SERVER_IP:$NGINX_CONF
echo "📦 Загрузили проект на сервер"

ssh $SERVER_USER@$SERVER_IP << EOF
  set -e

  echo "🚀 Подключились к серверу. Начинаем деплой..."

  echo "📦 Установка необходимых пакетов..."
  sudo apt update -y
  sudo apt install -y nginx nodejs npm

  echo "📂 Переход в папку проекта..."
  cd $PROJECT_DIR

  echo "📦 Устанавливаем зависимости..."
  npm install --legacy-peer-deps

  echo "🏗️ Выполняем сборку React-приложения..."
  npm run build

  echo "🔄 Настраиваем Nginx..."
  

echo "🔗 Активируем конфигурацию..."
  sudo ln -sf $NGINX_CONF /etc/nginx/sites-enabled/
  sudo nginx -t

  echo "♻️ Перезапускаем Nginx..."
  sudo systemctl restart nginx

  echo "✅ Деплой завершён!"
EOF