/**
 * YSK Family Finance - Internationalization (i18n)
 * Khmer (ភាសាខ្មែរ) & English (English)
 */

const translations = {
  km: {
    // Brand & App
    appName: "YSK Family Finance",
    appSubtitle: "ប្រព័ន្ធគ្រប់គ្រងហិរញ្ញវត្ថុគ្រួសារឆ្លាតវៃ",
    systemStatus: "ដំណើរការធម្មតា",
    
    // Navigation
    navDashboard: "ផ្ទាំងគ្រប់គ្រង",
    navTransactions: "ប្រតិបត្តិការ",
    navBudgets: "កញ្ចប់ថវិកា",
    navAnalytics: "ការវិភាគឆ្លាតវៃ",
    navDebts: "បំណុល & កម្ចី",
    navGoals: "គោលដៅសន្សំ",
    navSettings: "ការកំណត់",
    
    // Quick Actions
    btnAddTransaction: "កត់ត្រាថ្មី",
    btnAddIncome: "បន្ថែមចំណូល",
    btnAddExpense: "បន្ថែមចំណាយ",
    btnExportExcel: "ទាញយក Excel/CSV",
    btnPrintReport: "បោះពុម្ពរបាយការណ៍",
    btnCheckUpdate: "ពិនិត្យមើលកំណែថ្មី",
    
    // Summary Cards
    cardTotalBalance: "សមតុល្យសរុបគ្រួសារ",
    cardMonthlyIncome: "ចំណូលប្រចាំខែនេះ",
    cardMonthlyExpense: "ចំណាយប្រចាំខែនេះ",
    cardNetSavings: "ប្រាក់សន្សំសុទ្ធ",
    cardSavingsRate: "អត្រាសន្សំប្រចាំខែ",
    cardHealthScore: "ពិន្ទុសុខភាពហិរញ្ញវត្ថុ",
    
    // Filters & Search
    filterAll: "ទាំងអស់",
    filterMonth: "ជ្រើសរើសខែ",
    filterMember: "សមាជិកគ្រួសារ",
    filterCategory: "ប្រភេទ",
    filterType: "ប្រភេទប្រតិបត្តិការ",
    searchPlaceholder: "ស្វែងរកតាមចំណាំ បរិយាយ...",
    
    // Transaction Types
    typeIncome: "ចំណូល (+)",
    typeExpense: "ចំណាយ (-)",
    
    // Categories
    catFood: "ម្ហូបអាហារ & ភេសជ្ជៈ",
    catHousing: "ថ្លៃផ្ទះ & បន្ទប់",
    catUtilities: "ទឹក ភ្លើង & អ៊ីនធឺណិត",
    catTransport: "ការធ្វើដំណើរ & សាំង",
    catHealth: "សុខភាព & ថ្នាំពេទ្យ",
    catEducation: "ការអប់រំ & សាលារៀន",
    catShopping: "ទិញទំនិញ & សម្លៀកបំពាក់",
    catEntertainment: "ការកម្សាន្ត & ដំណើរកម្សាន្ត",
    catFamily: "គ្រួសារ & កូនៗ",
    catInvestment: "វិនិយោគ & សន្សំទុក",
    catSalary: "ប្រាក់ខែ & ប្រាក់ចំណូលប្រចាំ",
    catBusiness: "អាជីវកម្ម & ការលក់ដូរ",
    catFreelance: "ការងារក្រៅម៉ោង/គម្រោង",
    catGift: "អំណោយ & ប្រាក់រង្វាន់",
    catOther: "ចំណាយ/ចំណូលផ្សេងៗ",
    
    // Family Members
    memberAll: "គ្រួសារទាំងមូល",
    memberDad: "ឪពុក (Dad)",
    memberMom: "ម្ដាយ (Mom)",
    memberSon: "កូនប្រុស (Son)",
    memberDaughter: "កូនស្រី (Daughter)",
    memberShared: "ចំណាយរួមគ្រួសារ",
    
    // Payment Methods
    payAba: "ABA Bank",
    payAcleda: "ACLEDA Bank",
    payWing: "Wing Bank / TrueMoney",
    payCash: "សាច់ប្រាក់សុទ្ធ (Cash)",
    payCard: "កាតឥណទាន (Credit Card)",
    payOther: "ផ្សេងទៀត",
    
    // Table Headers
    thDate: "កាលបរិច្ឆេទ",
    thType: "ប្រភេទ",
    thCategory: "ជំពូក/ប្រភេទ",
    thMember: "សមាជិក",
    thAccount: "ទូទាត់តាម",
    thNote: "បរិយាយ / ចំណាំ",
    thAmount: "ចំនួនទឹកប្រាក់",
    thActions: "សកម្មភាព",
    noTransactions: "មិនទាន់មានទិន្នន័យប្រតិបត្តិការនៅឡើយទេ",
    
    // Budgets Section
    budgetTitle: "កញ្ចប់ថវិកាប្រចាំខែ (Monthly Budgets)",
    budgetSubtitle: "កំណត់ទំហំចំណាយដើម្បីកុំឱ្យលើសផែនការ",
    budgetSet: "កំណត់ថវិកា",
    budgetSpent: "បានចំណាយ",
    budgetLimit: "កម្រិតអតិបរមា",
    budgetRemaining: "នៅសល់",
    budgetOver: "លើសផែនការ",
    budgetSafe: "ស្ថិតក្នុងកម្រិតល្អ",
    budgetWarning: "ជិតដល់កម្រិតកំណត់ (៨០%+)",
    
    // Financial Health & Smart Insights
    healthTitle: "ការវិភាគឆ្លាតវៃ & សុខភាពហិរញ្ញវត្ថុ",
    healthExcellent: "ល្អឥតខ្ចោះ (Excellent)",
    healthGood: "ល្អប្រសើរ (Healthy)",
    healthFair: "មធ្យម (Fair)",
    healthAlert: "គួរប្រុងប្រយ័ត្ន (Attention Needed)",
    
    // Debts & Loans
    debtTitle: "ការគ្រប់គ្រងបំណុល & កម្ចី",
    debtSubtitle: "តាមដានប្រាក់ដែលត្រូវសងគេ និងប្រាក់ដែលគេជំពាក់យើង",
    debtIOwe: "ខ្ញុំជំពាក់គេ (ត្រូវសង)",
    debtOwedToMe: "គេជំពាក់ខ្ញុំ (ត្រូវទារ)",
    debtPerson: "ឈ្មោះបុគ្គល/ស្ថាប័ន",
    debtDueDate: "ថ្ងៃកំណត់សង",
    debtStatus: "ស្ថានភាព",
    debtPending: "មិនទាន់សង",
    debtPaid: "បានទូទាត់រួច",
    btnAddDebt: "បន្ថែមបំណុល/កម្ចី",
    
    // Savings Goals
    goalTitle: "គោលដៅសន្សំគ្រួសារ (Savings Goals)",
    goalSubtitle: "សន្សំប្រាក់ដើម្បីក្ដីសុបិន និងអនាគតគ្រួសារ",
    goalTarget: "គោលដៅ",
    goalCurrent: "សន្សំបាន",
    goalDeadline: "កាលបរិច្ឆេទកំណត់",
    btnAddGoal: "បន្ថែមគោលដៅថ្មី",
    
    // Currency & Exchange
    currencyDisplay: "រូបិយប័ណ្ណបង្ហាញ",
    exchangeRateLabel: "អត្រាប្តូរប្រាក់ (1 USD = ៛)",
    riel: "៛ (KHR)",
    usd: "$ (USD)",
    
    // Modals
    modalAddTitle: "កត់ត្រាប្រតិបត្តិការហិរញ្ញវត្ថុ",
    modalEditTitle: "កែប្រែប្រតិបត្តិការ",
    labelType: "ប្រភេទប្រតិបត្តិការ",
    labelAmount: "ចំនួនទឹកប្រាក់",
    labelCurrency: "រូបិយប័ណ្ណ",
    labelCategory: "ប្រភេទចំណាយ/ចំណូល",
    labelDate: "កាលបរិច្ឆេទ",
    labelMember: "សមាជិកគ្រួសារ",
    labelPayment: "ទូទាត់តាម",
    labelNote: "ចំណាំបន្ថែម (ស្រេចចិត្ត)",
    btnSave: "រក្សាទុក",
    btnCancel: "បោះបង់",
    btnDelete: "លុបចេញ",
    confirmDelete: "តើអ្នកពិតជាចង់លុបទិន្នន័យនេះមែនទេ?",
    
    // GitHub Auto Update
    githubUpdateTitle: "ប្រព័ន្ធបច្ចុប្បន្នភាព GitHub Auto-Update",
    githubCurrentVersion: "កំណែបច្ចុប្បន្ន",
    githubLatestVersion: "កំណែចុងក្រោយនៅលើ GitHub",
    githubStatusChecking: "កំពុងពិនិត្យមើលកំណែថ្មី...",
    githubStatusUpToDate: "ប្រព័ន្ធរបស់អ្នកស្ថិតក្នុងកំណែចុងក្រោយបង្អស់ហើយ!",
    githubStatusUpdateAvailable: "មានកំណែថ្មី! ចុចប៊ូតុងខាងក្រោមដើម្បីធ្វើបច្ចុប្បន្នភាពភ្លាមៗ",
    btnUpdateNow: "ធ្វើបច្ចុប្បន្នភាពឥឡូវនេះ (Update Now)",
    githubRepoLink: "មើលកូដនៅលើ GitHub Repo",
    howToAutoDeploy: "របៀបដំណើរការ Auto-Deploy តាម GitHub",
    autoDeployDesc: "រាល់ពេលអ្នក Push កូដទៅកាន់ GitHub ប្រព័ន្ធ GitHub Actions នឹង Update កម្មវិធីនេះទាំងលើកុំព្យូទ័រ និងទូរស័ព្ទដោយស្វ័យប្រវត្តិ។",
    
    // Data Management
    backupRestoreTitle: "បម្រុងទុក & ស្ដារទិន្នន័យ (Backup & Restore)",
    btnBackupJSON: "ទាញយក Backup (JSON)",
    btnRestoreJSON: "ស្ដារទិន្នន័យពី JSON",
    btnResetDemo: "ផ្ទុកទិន្នន័យគំរូឡើងវិញ",
    restoreSuccess: "បានស្ដារទិន្នន័យដោយជោគជ័យ!",
    saveSuccess: "បានរក្សាទុកដោយជោគជ័យ!"
  },
  
  en: {
    // Brand & App
    appName: "YSK Family Finance",
    appSubtitle: "Smart Bilingual Family Finance System",
    systemStatus: "Operational",
    
    // Navigation
    navDashboard: "Dashboard",
    navTransactions: "Transactions",
    navBudgets: "Budgets",
    navAnalytics: "Smart Analytics",
    navDebts: "Debts & Loans",
    navGoals: "Savings Goals",
    navSettings: "Settings",
    
    // Quick Actions
    btnAddTransaction: "New Record",
    btnAddIncome: "Add Income",
    btnAddExpense: "Add Expense",
    btnExportExcel: "Export Excel/CSV",
    btnPrintReport: "Print Report",
    btnCheckUpdate: "Check for Updates",
    
    // Summary Cards
    cardTotalBalance: "Total Family Balance",
    cardMonthlyIncome: "This Month's Income",
    cardMonthlyExpense: "This Month's Expense",
    cardNetSavings: "Net Savings",
    cardSavingsRate: "Monthly Savings Rate",
    cardHealthScore: "Financial Health Score",
    
    // Filters & Search
    filterAll: "All",
    filterMonth: "Select Month",
    filterMember: "Family Member",
    filterCategory: "Category",
    filterType: "Transaction Type",
    searchPlaceholder: "Search note, description...",
    
    // Transaction Types
    typeIncome: "Income (+)",
    typeExpense: "Expense (-)",
    
    // Categories
    catFood: "Food & Dining",
    catHousing: "Housing & Rent",
    catUtilities: "Utilities & Internet",
    catTransport: "Transportation & Fuel",
    catHealth: "Health & Medical",
    catEducation: "Education & Tuition",
    catShopping: "Shopping & Clothes",
    catEntertainment: "Entertainment & Trips",
    catFamily: "Family & Children",
    catInvestment: "Investments & Savings",
    catSalary: "Salary & Regular Pay",
    catBusiness: "Business & Sales",
    catFreelance: "Side Projects / Freelance",
    catGift: "Gifts & Bonuses",
    catOther: "Other Income / Expense",
    
    // Family Members
    memberAll: "Entire Family",
    memberDad: "Dad",
    memberMom: "Mom",
    memberSon: "Son",
    memberDaughter: "Daughter",
    memberShared: "Shared Family Expense",
    
    // Payment Methods
    payAba: "ABA Bank",
    payAcleda: "ACLEDA Bank",
    payWing: "Wing Bank / TrueMoney",
    payCash: "Cash (សាច់ប្រាក់)",
    payCard: "Credit Card",
    payOther: "Other",
    
    // Table Headers
    thDate: "Date",
    thType: "Type",
    thCategory: "Category",
    thMember: "Member",
    thAccount: "Payment Method",
    thNote: "Description / Notes",
    thAmount: "Amount",
    thActions: "Actions",
    noTransactions: "No transaction records found",
    
    // Budgets Section
    budgetTitle: "Monthly Budgets",
    budgetSubtitle: "Set spending limits to stay on track",
    budgetSet: "Budget Limit",
    budgetSpent: "Spent",
    budgetLimit: "Max Limit",
    budgetRemaining: "Remaining",
    budgetOver: "Over Budget",
    budgetSafe: "Within Budget",
    budgetWarning: "Near Limit (80%+)",
    
    // Financial Health & Smart Insights
    healthTitle: "Smart Analytics & Health Score",
    healthExcellent: "Excellent",
    healthGood: "Healthy",
    healthFair: "Fair",
    healthAlert: "Attention Needed",
    
    // Debts & Loans
    debtTitle: "Debt & Loan Management",
    debtSubtitle: "Track amounts you owe and amounts owed to you",
    debtIOwe: "I Owe (Payable)",
    debtOwedToMe: "Owed to Me (Receivable)",
    debtPerson: "Person / Institution",
    debtDueDate: "Due Date",
    debtStatus: "Status",
    debtPending: "Pending",
    debtPaid: "Settled / Paid",
    btnAddDebt: "Add Debt / Loan",
    
    // Savings Goals
    goalTitle: "Family Savings Goals",
    goalSubtitle: "Save together for dreams and family milestones",
    goalTarget: "Target",
    goalCurrent: "Current Saved",
    goalDeadline: "Target Date",
    btnAddGoal: "Add New Goal",
    
    // Currency & Exchange
    currencyDisplay: "Display Currency",
    exchangeRateLabel: "Exchange Rate (1 USD = KHR)",
    riel: "៛ (KHR)",
    usd: "$ (USD)",
    
    // Modals
    modalAddTitle: "Record Transaction",
    modalEditTitle: "Edit Transaction",
    labelType: "Transaction Type",
    labelAmount: "Amount",
    labelCurrency: "Currency",
    labelCategory: "Category",
    labelDate: "Date",
    labelMember: "Family Member",
    labelPayment: "Payment Method",
    labelNote: "Notes (Optional)",
    btnSave: "Save",
    btnCancel: "Cancel",
    btnDelete: "Delete",
    confirmDelete: "Are you sure you want to delete this record?",
    
    // GitHub Auto Update
    githubUpdateTitle: "GitHub Auto-Update System",
    githubCurrentVersion: "Current Version",
    githubLatestVersion: "Latest on GitHub",
    githubStatusChecking: "Checking for updates...",
    githubStatusUpToDate: "Your application is completely up to date!",
    githubStatusUpdateAvailable: "New update available! Click below to update instantly",
    btnUpdateNow: "Update Now",
    githubRepoLink: "View Repository on GitHub",
    howToAutoDeploy: "How Auto-Deploy via GitHub Works",
    autoDeployDesc: "Every time code is pushed to GitHub, GitHub Actions automatically deploys the latest version to both PC and Mobile devices.",
    
    // Data Management
    backupRestoreTitle: "Backup & Restore",
    btnBackupJSON: "Download Backup (JSON)",
    btnRestoreJSON: "Restore from JSON",
    btnResetDemo: "Reload Demo Data",
    restoreSuccess: "Data restored successfully!",
    saveSuccess: "Saved successfully!"
  }
};

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('ysk_lang') || 'km'; // Default to Khmer
    this.exchangeRate = parseFloat(localStorage.getItem('ysk_exchange_rate')) || 4100; // 1 USD = 4,100 KHR
    this.displayCurrency = localStorage.getItem('ysk_currency') || 'USD'; // 'USD' or 'KHR'
  }

  setLanguage(lang) {
    if (translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem('ysk_lang', lang);
      document.documentElement.lang = lang;
      this.applyTranslations();
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }
  }

  getLanguage() {
    return this.currentLang;
  }

  t(key) {
    return translations[this.currentLang][key] || translations['en'][key] || key;
  }

  setDisplayCurrency(curr) {
    this.displayCurrency = curr;
    localStorage.setItem('ysk_currency', curr);
    window.dispatchEvent(new CustomEvent('currencyChanged', { detail: { currency: curr } }));
  }

  setExchangeRate(rate) {
    this.exchangeRate = rate;
    localStorage.setItem('ysk_exchange_rate', rate);
    window.dispatchEvent(new CustomEvent('exchangeRateChanged', { detail: { rate } }));
  }

  // Format currency with proper symbols and number format
  formatCurrency(amount, sourceCurrency = 'USD') {
    let finalAmount = amount;
    let targetCurrency = this.displayCurrency;

    if (sourceCurrency === 'USD' && targetCurrency === 'KHR') {
      finalAmount = amount * this.exchangeRate;
    } else if (sourceCurrency === 'KHR' && targetCurrency === 'USD') {
      finalAmount = amount / this.exchangeRate;
    }

    if (targetCurrency === 'KHR') {
      return Math.round(finalAmount).toLocaleString(this.currentLang === 'km' ? 'km-KH' : 'en-US') + ' ៛';
    } else {
      return '$' + finalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  }

  // Raw converted value in display currency
  convertToDisplay(amount, sourceCurrency = 'USD') {
    if (sourceCurrency === 'USD' && this.displayCurrency === 'KHR') {
      return amount * this.exchangeRate;
    }
    if (sourceCurrency === 'KHR' && this.displayCurrency === 'USD') {
      return amount / this.exchangeRate;
    }
    return amount;
  }

  // Always convert any amount to base USD for standard internal storage & metrics
  toBaseUSD(amount, currency) {
    if (currency === 'KHR') {
      return amount / this.exchangeRate;
    }
    return amount;
  }

  // Apply all data-i18n attributes across DOM
  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && translations[this.currentLang][key]) {
        el.textContent = translations[this.currentLang][key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key && translations[this.currentLang][key]) {
        el.setAttribute('placeholder', translations[this.currentLang][key]);
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (key && translations[this.currentLang][key]) {
        el.setAttribute('title', translations[this.currentLang][key]);
      }
    });
  }
}

// Global i18n singleton
window.i18n = new I18nManager();
