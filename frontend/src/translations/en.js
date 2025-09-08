export default {
  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    close: 'Close',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    copy: 'Copy',
    copied: 'Copied!',
    yes: 'Yes',
    no: 'No',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    search: 'Search',
    filter: 'Filter',
    clear: 'Clear',
    submit: 'Submit',
    confirm: 'Confirm',
    language: 'Language',
  },

  // Navigation
  navigation: {
    home: 'Home',
    profile: 'Profile',
    payments: 'Payments',
    settings: 'Settings',
    logout: 'Logout',
  },

  // Authentication
  auth: {
    login: 'Login',
    logout: 'Logout',
    enterCode: 'Enter code',
    codePlaceholder: 'Enter 6-digit code',
    invalidCode: 'Invalid code',
    loginSuccess: 'Login successful',
    loginError: 'Login error',
    secretKey: 'Secret Key',
    twoFactorCode: '2FA Code',
  },

  // Home page
  home: {
    title: 'Dashboard',
    createPayment: 'Create Payment',
    createWithdrawal: 'Create Withdrawal',
    balance: 'Balance',
    totalPayments: 'Total Payments',
    successfulPayments: 'Successful Payments',
    pendingPayments: 'Pending Payments',
    failedPayments: 'Failed Payments',
  },

  // Payments
  payments: {
    title: 'Payments',
    amount: 'Amount',
    status: 'Status',
    date: 'Date',
    paymentId: 'Payment ID',
    number: 'Number',
    currency: 'Currency',
    createNew: 'Create new payment',
    createWithdrawal: 'Create withdrawal',
    statuses: {
      success: 'Success',
      pending: 'Payment',
      failed: 'Error',
      completed: 'Completed',
      processing: 'Processing',
      error: 'Error',
      unknown: 'Unknown',
    },
  },

  // Modals
  modals: {
    createPayment: {
      title: 'Create Payment',
      amount: 'Amount',
      amountPlaceholder: 'Enter amount',
      type: 'Payment type',
      currency: 'Currency',
      create: 'Create',
      cancel: 'Cancel',
      amountRequired: 'Amount is required',
      amountInvalid: 'Invalid amount',
    },
    createWithdrawal: {
      title: 'Create Withdrawal',
      amount: 'Amount',
      amountPlaceholder: 'Enter amount',
      cardNumber: 'Card Number',
      cardNumberPlaceholder: 'Enter card number',
      bank: 'Bank',
      selectBank: 'Select bank',
      create: 'Create',
      cancel: 'Cancel',
      amountRequired: 'Amount is required',
      amountInvalid: 'Invalid amount',
      cardRequired: 'Card number is required',
      cardInvalid: 'Invalid card number',
      bankRequired: 'Bank is required',
    },
    paymentCard: {
      title: 'Payment Details',
      cardHolder: 'CARD HOLDER',
      amount: 'AMOUNT',
      paymentId: 'Payment ID:',
      status: 'Status:',
      time: 'Time:',
      expired: 'Expired',
      noData: 'No data',
      checkStatus: 'Check Status',
      close: 'Close',
      clickToCopy: 'Click on any text to copy',
    },
  },

  // Profile
  profile: {
    title: 'Profile',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    balance: 'Balance',
    totalPayments: 'Total Payments',
    successfulPayments: 'Successful Payments',
    lastLogin: 'Last Login',
    accountCreated: 'Account Created',
  },

  // Errors
  errors: {
    networkError: 'Network error',
    serverError: 'Server error',
    unauthorized: 'Unauthorized',
    forbidden: 'Forbidden',
    notFound: 'Not found',
    validationError: 'Validation error',
    unknownError: 'Unknown error',
    copyError: 'Copy error',
    paymentError: 'Payment error',
  },

  // 404 page
  notFound: {
    title: '404',
    subtitle: 'Page not found',
    description: 'Sorry, the requested page does not exist.',
    backHome: 'Back to home',
  },

  // Languages
  languages: {
    ru: 'Русский',
    en: 'English',
    az: 'Azərbaycan',
  },

  // Create Payment Modal
  createPaymentModal: {
    createPayment: 'Create Payment',
    createWithdrawal: 'Create Withdrawal',
    amount: 'Amount:',
    enterAmount: 'Enter amount',
    cardNumber: 'Card Number:',
    cardPlaceholder: '1234 5678 9012 3456',
    bank: 'Bank:',
    selectBank: 'Select bank',
    confirm: 'Confirm',
    close: 'Close',
    cardTooShort: 'Card number is too short',
    cardTooLong: 'Card number is too long',
    invalidCard: 'Invalid card number',
    enterCardNumber: 'Enter card number',
    selectBankError: 'Select bank',
    paymentError: 'Error creating payment',
    withdrawalError: 'Error creating withdrawal',
    generalError: 'An error occurred',
    withdrawalCreated: 'Withdrawal request created!',
    amountLabel: 'Amount:',
    cardNumberLabel: 'Card Number:',
    bankLabel: 'Bank:',
    requestIdLabel: 'Request ID:',
    withdrawalInstructions: 'Your withdrawal request has been accepted and is being processed.',
    withdrawalTime: 'Money will be credited to the specified card within 1 hour.'
  },
};
