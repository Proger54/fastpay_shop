export default {
  // Ümumi
  common: {
    loading: 'Yüklənir...',
    error: 'Xəta',
    success: 'Uğurlu',
    cancel: 'Ləğv et',
    close: 'Bağla',
    save: 'Saxla',
    delete: 'Sil',
    edit: 'Redaktə et',
    copy: 'Kopyala',
    copied: 'Kopyalandı!',
    yes: 'Bəli',
    no: 'Xeyr',
    back: 'Geri',
    next: 'Növbəti',
    previous: 'Əvvəlki',
    search: 'Axtar',
    filter: 'Filtr',
    clear: 'Təmizlə',
    submit: 'Göndər',
    confirm: 'Təsdiq et',
    language: 'Dil',
  },

  // Naviqasiya
  navigation: {
    home: 'Ana səhifə',
    profile: 'Profil',
    payments: 'Ödənişlər',
    settings: 'Tənzimləmələr',
    logout: 'Çıxış',
  },

  // Autentifikasiya
  auth: {
    login: 'Daxil ol',
    logout: 'Hesabdan çıx',
    enterCode: 'Kod daxil edin',
    codePlaceholder: '6 rəqəmli kod daxil edin',
    invalidCode: 'Yanlış kod',
    loginSuccess: 'Uğurlu giriş',
    loginError: 'Giriş xətası',
    secretKey: 'Gizli açar',
    twoFactorCode: '2FA Kodu',
  },

  // Ana səhifə
  home: {
    title: 'İdarə paneli',
    createPayment: 'Ödəniş yarat',
    createWithdrawal: 'Çıxarış yarat',
    balance: 'Balans',
    totalPayments: 'Ümumi ödənişlər',
    successfulPayments: 'Uğurlu ödənişlər',
    pendingPayments: 'Gözləyən ödənişlər',
    failedPayments: 'Uğursuz ödənişlər',
  },

  // Ödənişlər
  payments: {
    title: 'Ödənişlər',
    amount: 'Məbləğ',
    status: 'Status',
    date: 'Tarix',
    paymentId: 'Ödəniş ID',
    number: 'Nömrə',
    currency: 'Valyuta',
    createNew: 'Yeni ödəniş yarat',
    createWithdrawal: 'Çıxarış yarat',
    statuses: {
      success: 'Uğurlu',
      pending: 'Ödəniş',
      failed: 'Xəta',
      completed: 'Tamamlandı',
      processing: 'İşlənir',
      error: 'Xəta',
      unknown: 'Naməlum',
    },
  },

  // Modallar
  modals: {
    createPayment: {
      title: 'Ödəniş yarat',
      amount: 'Məbləğ',
      amountPlaceholder: 'Məbləği daxil edin',
      type: 'Ödəniş növü',
      currency: 'Valyuta',
      create: 'Yarat',
      cancel: 'Ləğv et',
      amountRequired: 'Məbləğ tələb olunur',
      amountInvalid: 'Yanlış məbləğ',
    },
    createWithdrawal: {
      title: 'Çıxarış yarat',
      amount: 'Məbləğ',
      amountPlaceholder: 'Məbləği daxil edin',
      cardNumber: 'Kart nömrəsi',
      cardNumberPlaceholder: 'Kart nömrəsini daxil edin',
      bank: 'Bank',
      selectBank: 'Bank seçin',
      create: 'Yarat',
      cancel: 'Ləğv et',
      amountRequired: 'Məbləğ tələb olunur',
      amountInvalid: 'Yanlış məbləğ',
      cardRequired: 'Kart nömrəsi tələb olunur',
      cardInvalid: 'Yanlış kart nömrəsi',
      bankRequired: 'Bank tələb olunur',
    },
    paymentCard: {
      title: 'Ödəniş məlumatları',
      cardHolder: 'KART SAHİBİ',
      amount: 'MƏBLƏĞ',
      paymentId: 'Ödəniş ID:',
      status: 'Status:',
      time: 'Vaxt:',
      expired: 'Vaxtı bitib',
      noData: 'Məlumat yoxdur',
      checkStatus: 'Statusu yoxla',
      close: 'Bağla',
      clickToCopy: 'Kopyalamaq üçün hər hansı mətnə klikləyin',
    },
  },

  // Profil
  profile: {
    title: 'Profil',
    name: 'Ad',
    email: 'Email',
    phone: 'Telefon',
    balance: 'Balans',
    totalPayments: 'Ümumi ödənişlər',
    successfulPayments: 'Uğurlu ödənişlər',
    lastLogin: 'Son giriş',
    accountCreated: 'Hesab yaradıldı',
  },

  // Xətalar
  errors: {
    networkError: 'Şəbəkə xətası',
    serverError: 'Server xətası',
    unauthorized: 'İcazəsiz',
    forbidden: 'Qadağandır',
    notFound: 'Tapılmadı',
    validationError: 'Doğrulama xətası',
    unknownError: 'Naməlum xəta',
    copyError: 'Kopyalama xətası',
    paymentError: 'Ödəniş xətası',
  },

  // 404 səhifə
  notFound: {
    title: '404',
    subtitle: 'Səhifə tapılmadı',
    description: 'Üzr istəyirik, axtarılan səhifə mövcud deyil.',
    backHome: 'Ana səhifəyə qayıt',
  },

  // Dillər
  languages: {
    ru: 'Русский',
    en: 'English',
    az: 'Azərbaycan',
  },

  // Ödəniş Yaratmaq Modal
  createPaymentModal: {
    createPayment: 'Ödəniş yarat',
    createWithdrawal: 'Çıxarış yarat',
    amount: 'Məbləğ:',
    enterAmount: 'Məbləği daxil edin',
    cardNumber: 'Kart nömrəsi:',
    cardPlaceholder: '1234 5678 9012 3456',
    bank: 'Bank:',
    selectBank: 'Bank seçin',
    confirm: 'Təsdiq et',
    close: 'Bağla',
    cardTooShort: 'Kart nömrəsi çox qısadır',
    cardTooLong: 'Kart nömrəsi çox uzundur',
    invalidCard: 'Yanlış kart nömrəsi',
    enterCardNumber: 'Kart nömrəsini daxil edin',
    selectBankError: 'Bank seçin',
    paymentError: 'Ödəniş yaratmaqda xəta',
    withdrawalError: 'Çıxarış yaratmaqda xəta',
    generalError: 'Xəta baş verdi',
    withdrawalCreated: 'Çıxarış sorğusu yaradıldı!',
    amountLabel: 'Məbləğ:',
    cardNumberLabel: 'Kart nömrəsi:',
    bankLabel: 'Bank:',
    requestIdLabel: 'Sorğu ID:',
    withdrawalInstructions: 'Çıxarış sorğunuz qəbul edildi və emal olunur.',
    withdrawalTime: 'Pul göstərilən karta 1 saat ərzində köçürüləcək.'
  },
};
