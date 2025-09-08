export default {
  // Общие
  common: {
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
    cancel: 'Отмена',
    close: 'Закрыть',
    save: 'Сохранить',
    delete: 'Удалить',
    edit: 'Редактировать',
    copy: 'Копировать',
    copied: 'Скопировано!',
    yes: 'Да',
    no: 'Нет',
    back: 'Назад',
    next: 'Далее',
    previous: 'Предыдущий',
    search: 'Поиск',
    filter: 'Фильтр',
    clear: 'Очистить',
    submit: 'Отправить',
    confirm: 'Подтвердить',
    language: 'Язык',
  },

  // Навигация
  navigation: {
    home: 'Главная',
    profile: 'Профиль',
    payments: 'Платежи',
    settings: 'Настройки',
    logout: 'Выйти',
  },

  // Авторизация
  auth: {
    login: 'Войти',
    logout: 'Выйти из аккаунта',
    enterCode: 'Введите код',
    codePlaceholder: 'Введите 6-значный код',
    invalidCode: 'Неверный код',
    loginSuccess: 'Успешный вход',
    loginError: 'Ошибка входа',
    secretKey: 'Секретный ключ',
    twoFactorCode: '2FA Код',
  },

  // Главная страница
  home: {
    title: 'Панель управления',
    createPayment: 'Создать платеж',
    createWithdrawal: 'Создать вывод',
    balance: 'Баланс',
    totalPayments: 'Всего платежей',
    successfulPayments: 'Успешные платежи',
    pendingPayments: 'Ожидающие платежи',
    failedPayments: 'Неудачные платежи',
  },

  // Платежи
  payments: {
    title: 'Платежи',
    amount: 'Сумма',
    status: 'Статус',
    date: 'Дата',
    paymentId: 'ID платежа',
    number: 'Номер',
    currency: 'Валюта',
    createNew: 'Создать новый платеж',
    createWithdrawal: 'Создать вывод',
    statuses: {
      success: 'Успешно',
      pending: 'Оплата',
      failed: 'Ошибка',
      completed: 'Завершен',
      processing: 'В обработке',
      error: 'Ошибка',
      unknown: 'Неизвестно',
    },
  },

  // Модальные окна
  modals: {
    createPayment: {
      title: 'Создать платеж',
      amount: 'Сумма',
      amountPlaceholder: 'Введите сумму',
      type: 'Тип платежа',
      currency: 'Валюта',
      create: 'Создать',
      cancel: 'Отмена',
      amountRequired: 'Сумма обязательна',
      amountInvalid: 'Неверная сумма',
    },
    createWithdrawal: {
      title: 'Создать вывод',
      amount: 'Сумма',
      amountPlaceholder: 'Введите сумму',
      cardNumber: 'Номер карты',
      cardNumberPlaceholder: 'Введите номер карты',
      bank: 'Банк',
      selectBank: 'Выберите банк',
      create: 'Создать',
      cancel: 'Отмена',
      amountRequired: 'Сумма обязательна',
      amountInvalid: 'Неверная сумма',
      cardRequired: 'Номер карты обязателен',
      cardInvalid: 'Неверный номер карты',
      bankRequired: 'Банк обязателен',
    },
    paymentCard: {
      title: 'Данные для оплаты',
      cardHolder: 'CARD HOLDER',
      amount: 'AMOUNT',
      paymentId: 'ID платежа:',
      status: 'Статус:',
      time: 'Время:',
      expired: 'Истекло',
      noData: 'Нет данных',
      checkStatus: 'Проверить статус',
      close: 'Закрыть',
      clickToCopy: 'Кликните на любой текст для копирования',
    },
  },

  // Профиль
  profile: {
    title: 'Профиль',
    name: 'Имя',
    email: 'Email',
    phone: 'Телефон',
    balance: 'Баланс',
    totalPayments: 'Всего платежей',
    successfulPayments: 'Успешные платежи',
    lastLogin: 'Последний вход',
    accountCreated: 'Аккаунт создан',
  },

  // Ошибки
  errors: {
    networkError: 'Ошибка сети',
    serverError: 'Ошибка сервера',
    unauthorized: 'Не авторизован',
    forbidden: 'Доступ запрещен',
    notFound: 'Не найдено',
    validationError: 'Ошибка валидации',
    unknownError: 'Неизвестная ошибка',
    copyError: 'Ошибка копирования',
    paymentError: 'Ошибка платежа',
  },

  // 404 страница
  notFound: {
    title: '404',
    subtitle: 'Страница не найдена',
    description: 'Извините, запрашиваемая страница не существует.',
    backHome: 'Вернуться на главную',
  },

  // Языки
  languages: {
    ru: 'Русский',
    en: 'English',
    az: 'Azərbaycan',
  },

  // Create Payment Modal
  createPaymentModal: {
    createPayment: 'Создать платеж',
    createWithdrawal: 'Создать вывод',
    amount: 'Сумма:',
    enterAmount: 'Введите сумму',
    cardNumber: 'Номер карты:',
    cardPlaceholder: '1234 5678 9012 3456',
    bank: 'Банк:',
    selectBank: 'Выберите банк',
    confirm: 'Подтвердить',
    close: 'Закрыть',
    cardTooShort: 'Номер карты слишком короткий',
    cardTooLong: 'Номер карты слишком длинный',
    invalidCard: 'Неверный номер карты',
    enterCardNumber: 'Введите номер карты',
    selectBankError: 'Выберите банк',
    paymentError: 'Ошибка при создании платежа',
    withdrawalError: 'Ошибка при создании вывода',
    generalError: 'Произошла ошибка',
    withdrawalCreated: 'Заявка на вывод создана!',
    amountLabel: 'Сумма:',
    cardNumberLabel: 'Номер карты:',
    bankLabel: 'Банк:',
    requestIdLabel: 'ID заявки:',
    withdrawalInstructions: 'Ваша заявка на вывод принята и находится в обработке.',
    withdrawalTime: 'Деньги будут зачислены на указанную карту в течение 1 часа.'
  },
};
