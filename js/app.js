/**
 * YSK Family Finance - Main Application Controller
 */

class AppController {
  constructor() {
    this.currentView = 'dashboard';
    this.selectedMonth = 'all'; // Default to 'all' so no transactions are ever hidden by accident
    this.selectedMember = 'memberAll';
    this.selectedType = 'all';
    this.searchQuery = '';
    this.editingTxId = null;

    this.init();
  }

  init() {
    // Register PWA Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('ServiceWorker registered with scope:', reg.scope))
          .catch(err => console.warn('ServiceWorker registration failed:', err));
      });
    }

    // Set initial month to current month or 'all'
    const today = new Date();
    const curYear = today.getFullYear();
    const curMonth = String(today.getMonth() + 1).padStart(2, '0');
    this.currentMonthStr = `${curYear}-${curMonth}`;

    // Populate Month filter options
    this.populateMonthFilter();

    // Bind UI Events
    this.bindEvents();

    // Initial Translation & UI Render
    window.i18n.applyTranslations();
    this.updateLanguageUI();
    this.updateCurrencyUI();
    this.render();
  }

  // Floating Toast Notification
  showToast(msg, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${msg}</span>`;
    container.appendChild(toast);

    if ('vibrate' in navigator) {
      try { navigator.vibrate(40); } catch(e) {}
    }

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px) scale(0.96)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  populateMonthFilter() {
    const monthSelect = document.getElementById('filter-month');
    if (!monthSelect) return;

    monthSelect.innerHTML = '';
    const today = new Date();
    const isKm = window.i18n.getLanguage() === 'km';

    // 1. All Time Option (Default)
    const allOpt = document.createElement('option');
    allOpt.value = 'all';
    allOpt.textContent = isKm ? '📅 បង្ហាញគ្រប់ខែទាំងអស់ (All Months)' : '📅 All Time (All Months)';
    monthSelect.appendChild(allOpt);

    // 2. Last 12 months
    for (let i = 0; i < 12; i++) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const opt = document.createElement('option');
      opt.value = val;
      const monthLabel = d.toLocaleDateString(isKm ? 'km-KH' : 'en-US', { year: 'numeric', month: 'long' });
      opt.textContent = monthLabel;
      if (val === this.selectedMonth) opt.selected = true;
      monthSelect.appendChild(opt);
    }

    if (this.selectedMonth === 'all') allOpt.selected = true;
  }

  bindEvents() {
    // Language Toggle Button
    const langBtn = document.getElementById('btn-lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        const nextLang = window.i18n.getLanguage() === 'km' ? 'en' : 'km';
        window.i18n.setLanguage(nextLang);
        this.updateLanguageUI();
        this.populateMonthFilter();
        this.render();
      });
    }

    // Currency Switcher Button
    const currBtn = document.getElementById('btn-currency-toggle');
    if (currBtn) {
      currBtn.addEventListener('click', () => {
        const nextCurr = window.i18n.displayCurrency === 'USD' ? 'KHR' : 'USD';
        window.i18n.setDisplayCurrency(nextCurr);
        this.updateCurrencyUI();
        this.render();
      });
    }

    // Exchange rate input change
    const rateInput = document.getElementById('input-exchange-rate');
    if (rateInput) {
      rateInput.value = window.i18n.exchangeRate;
      rateInput.addEventListener('change', (e) => {
        const val = parseFloat(e.target.value) || 4100;
        window.i18n.setExchangeRate(val);
        this.render();
      });
    }

    // View Navigation (Desktop sidebar & Mobile bottom bar)
    document.querySelectorAll('[data-view-target]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = el.getAttribute('data-view-target');
        this.switchView(targetView);
      });
    });

    // Filters
    const monthFilter = document.getElementById('filter-month');
    if (monthFilter) {
      monthFilter.addEventListener('change', (e) => {
        this.selectedMonth = e.target.value;
        this.render();
      });
    }

    const memberFilter = document.getElementById('filter-member');
    if (memberFilter) {
      memberFilter.addEventListener('change', (e) => {
        this.selectedMember = e.target.value;
        this.render();
      });
    }

    const typeFilter = document.getElementById('filter-type');
    if (typeFilter) {
      typeFilter.addEventListener('change', (e) => {
        this.selectedType = e.target.value;
        this.render();
      });
    }

    const searchInput = document.getElementById('search-transactions');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.renderTransactions();
      });
    }

    // Modal Triggers: Add Transaction
    const addTxBtns = document.querySelectorAll('.trigger-add-tx');
    addTxBtns.forEach(btn => {
      btn.addEventListener('click', () => this.openTransactionModal());
    });

    // Form Submit: Save Transaction
    const txForm = document.getElementById('form-transaction');
    if (txForm) {
      txForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveTransaction();
      });
    }

    // Budget Form Submit
    const budgetForm = document.getElementById('form-budget');
    if (budgetForm) {
      budgetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveBudget();
      });
    }

    // Debt Form Submit
    const debtForm = document.getElementById('form-debt');
    if (debtForm) {
      debtForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveDebt();
      });
    }

    // Goal Form Submit
    const goalForm = document.getElementById('form-goal');
    if (goalForm) {
      goalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveGoal();
      });
    }

    // Export CSV / Excel
    const exportBtn = document.getElementById('btn-export-csv');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => window.storage.exportCSV());
    }

    // Print Report
    const printBtn = document.getElementById('btn-print-report');
    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }

    // Backup & Restore
    const backupBtn = document.getElementById('btn-backup-json');
    if (backupBtn) {
      backupBtn.addEventListener('click', () => window.storage.exportBackup());
    }

    const restoreInput = document.getElementById('input-restore-file');
    if (restoreInput) {
      restoreInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const success = window.storage.importBackup(event.target.result);
            if (success) {
              this.showToast(window.i18n.t('restoreSuccess'));
              this.render();
            } else {
              alert('Error restoring file.');
            }
          };
          reader.readAsText(file);
        }
      });
    }

    // Multi-Device Sync: Generate & Copy Sync Code
    const genSyncBtn = document.getElementById('btn-generate-sync');
    if (genSyncBtn) {
      genSyncBtn.addEventListener('click', () => {
        const code = window.storage.generateSyncCode();
        const codeInput = document.getElementById('sync-code-output');
        if (codeInput) {
          codeInput.value = code;
          codeInput.select();
        }
        navigator.clipboard.writeText(code).then(() => {
          this.showToast('✅ បានចម្លង Sync Code រួចរាល់! អាចយកទៅ Paste លើទូរស័ព្ទ');
        }).catch(() => {
          this.showToast('សូម Copy កូដក្នុងប្រអប់ខាងក្រោម');
        });
      });
    }

    // Multi-Device Sync: Import Sync Code
    const importSyncBtn = document.getElementById('btn-apply-sync');
    if (importSyncBtn) {
      importSyncBtn.addEventListener('click', () => {
        const codeInput = document.getElementById('sync-code-input');
        if (codeInput && codeInput.value.trim()) {
          const ok = window.storage.importSyncCode(codeInput.value.trim());
          if (ok) {
            this.showToast('✅ ធ្វើសមកាលកម្មទិន្នន័យជោគជ័យ! (Sync Complete)');
            codeInput.value = '';
            this.render();
          } else {
            alert('កូដ Sync មិនត្រឹមត្រូវទេ។ សូមពិនិត្យមើលម្ដងទៀត។');
          }
        } else {
          alert('សូមបញ្ចូលកូដ Sync Code!');
        }
      });
    }

    const clearAllBtn = document.getElementById('btn-clear-all');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        const isKm = window.i18n.getLanguage() === 'km';
        if (confirm(isKm ? 'តើអ្នកពិតជាចង់សម្អាត និងលុបទិន្នន័យចាស់ទាំងអស់ចេញមែនទេ? (Clear all data?)' : 'Are you sure you want to clear all data?')) {
          window.storage.clearAllData();
          this.showToast(isKm ? '✅ បានសម្អាតទិន្នន័យទាំងអស់រួចរាល់!' : '✅ All data cleared successfully!');
          this.render();
        }
      });
    }

    const resetDemoBtn = document.getElementById('btn-reset-demo');
    if (resetDemoBtn) {
      resetDemoBtn.addEventListener('click', () => {
        if (confirm('តើអ្នកចង់កំណត់ឡើងវិញនូវទិន្នន័យគំរូទាំងអស់មែនទេ? / Reset to demo data?')) {
          window.storage.loadDemoData();
          this.showToast('បានផ្ទុកទិន្នន័យគំរូឡើងវិញ!');
          this.render();
        }
      });
    }

    // Listen to storage update events
    window.addEventListener('transactionsUpdated', () => this.render());
    window.addEventListener('budgetsUpdated', () => this.render());
    window.addEventListener('debtsUpdated', () => this.render());
    window.addEventListener('goalsUpdated', () => this.render());
  }

  updateLanguageUI() {
    const isKm = window.i18n.getLanguage() === 'km';
    const label = document.getElementById('lang-label');
    if (label) label.textContent = isKm ? 'ភាសាខ្មែរ' : 'English';

    const flag = document.getElementById('lang-flag');
    if (flag) flag.textContent = isKm ? '🇰🇭' : '🇬🇧';
  }

  updateCurrencyUI() {
    const curr = window.i18n.displayCurrency;
    const label = document.getElementById('currency-label');
    if (label) label.textContent = curr === 'KHR' ? '៛ (KHR)' : '$ (USD)';
  }

  switchView(viewName) {
    this.currentView = viewName;
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.add('hidden');
    });

    const activeSec = document.getElementById(`view-${viewName}`);
    if (activeSec) activeSec.classList.remove('hidden');

    // Update Desktop Nav Active State
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('data-view-target') === viewName) {
        link.classList.add('bg-blue-50', 'text-blue-600', 'font-semibold');
        link.classList.remove('text-slate-600');
      } else {
        link.classList.remove('bg-blue-50', 'text-blue-600', 'font-semibold');
        link.classList.add('text-slate-600');
      }
    });

    // Update Mobile Bottom Nav Active State
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      if (item.getAttribute('data-view-target') === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.render();
  }

  // Master Render Method
  render() {
    const transactions = window.storage.getTransactions();
    const budgets = window.storage.getBudgets();
    const debts = window.storage.getDebts();
    const goals = window.storage.getGoals();

    const summary = window.analytics.calculateSummary(transactions, this.selectedMonth, this.selectedMember);
    const categoryBreakdown = window.analytics.getCategoryBreakdown(transactions, this.selectedMonth, this.selectedMember, 'expense');
    const health = window.analytics.calculateHealthScore(summary, budgets, debts, goals);
    const insights = window.analytics.generateSmartInsights(summary, categoryBreakdown, budgets);

    // 1. Render Summary Cards
    this.renderSummaryCards(summary, health);

    // 2. Render Smart Insights
    this.renderInsights(insights, health);

    // 3. Render Charts safely
    try {
      const trendData = window.analytics.getMonthlyTrend(transactions, 6);
      window.charts.renderExpensePie('chart-expense-pie', categoryBreakdown);
      window.charts.renderMonthlyTrend('chart-monthly-trend', trendData);
    } catch (e) {
      console.warn('Charts render skipped or error:', e);
    }

    // 4. Render Dashboard Recent Transactions Preview
    this.renderRecentDashboardTransactions(transactions);

    // 5. Render Transactions Table & Mobile Cards
    this.renderTransactions();

    // 6. Render Budgets
    this.renderBudgets(budgets, categoryBreakdown);

    // 7. Render Debts & Loans
    this.renderDebts(debts);

    // 8. Render Savings Goals
    this.renderGoals(goals);

    // Re-apply translations for dynamic strings
    window.i18n.applyTranslations();
  }

  renderSummaryCards(summary, health) {
    const i18n = window.i18n;

    // Total Balance
    const balEl = document.getElementById('stat-total-balance');
    if (balEl) balEl.textContent = i18n.formatCurrency(summary.totalBalanceUSD, 'USD');

    // Monthly Income
    const incEl = document.getElementById('stat-monthly-income');
    if (incEl) incEl.textContent = i18n.formatCurrency(summary.totalIncomeUSD, 'USD');

    // Monthly Expense
    const expEl = document.getElementById('stat-monthly-expense');
    if (expEl) expEl.textContent = i18n.formatCurrency(summary.totalExpenseUSD, 'USD');

    // Net Savings
    const savEl = document.getElementById('stat-net-savings');
    if (savEl) {
      savEl.textContent = i18n.formatCurrency(summary.netSavingsUSD, 'USD');
      savEl.className = summary.netSavingsUSD >= 0 
        ? 'text-xl sm:text-2xl font-black text-emerald-600' 
        : 'text-xl sm:text-2xl font-black text-rose-600';
    }

    // Savings Rate
    const rateEl = document.getElementById('stat-savings-rate');
    if (rateEl) rateEl.textContent = `${summary.savingsRate.toFixed(1)}%`;

    // Health Score
    const scoreEl = document.getElementById('stat-health-score');
    if (scoreEl) scoreEl.textContent = `${health.score}/100`;

    const statusBadge = document.getElementById('stat-health-status');
    if (statusBadge) {
      statusBadge.textContent = health.statusText;
      statusBadge.className = `text-xs px-2.5 py-0.5 rounded-full font-bold border ${health.badgeClass}`;
    }
  }

  renderInsights(insights, health) {
    const container = document.getElementById('smart-insights-list');
    if (!container) return;

    container.innerHTML = '';
    insights.forEach(item => {
      const div = document.createElement('div');
      let borderClr = 'border-blue-400 bg-blue-50/70 text-blue-900';
      if (item.type === 'success') borderClr = 'border-emerald-400 bg-emerald-50/70 text-emerald-900';
      if (item.type === 'danger') borderClr = 'border-rose-400 bg-rose-50/70 text-rose-900';
      if (item.type === 'tip') borderClr = 'border-amber-400 bg-amber-50/70 text-amber-900';

      div.className = `p-3.5 rounded-xl border-l-4 ${borderClr} flex items-start gap-3 text-sm`;
      div.innerHTML = `
        <i class="fa-solid ${item.icon} mt-0.5 text-base"></i>
        <div class="flex-1 font-medium">${item.text}</div>
      `;
      container.appendChild(div);
    });
  }

  // Render recent 5 transactions directly onto Dashboard
  renderRecentDashboardTransactions(transactions) {
    const container = document.getElementById('dashboard-recent-tx');
    if (!container) return;

    container.innerHTML = '';
    const recent = transactions.slice(0, 5);
    const i18n = window.i18n;

    if (recent.length === 0) {
      container.innerHTML = `<div class="text-xs text-slate-400 py-3 text-center">មិនទាន់មានប្រតិបត្តិការនៅឡើយទេ។ ចុច "+" ដើម្បីកត់ត្រាថ្មី!</div>`;
      return;
    }

    recent.forEach(tx => {
      const isIncome = tx.type === 'income';
      const formattedAmount = (isIncome ? '+' : '-') + ' ' + i18n.formatCurrency(tx.amount, tx.currency);
      const amountClass = isIncome ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold';

      const item = document.createElement('div');
      item.className = 'flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-xs';
      item.innerHTML = `
        <div class="flex items-center gap-2.5 min-w-0">
          <div class="w-8 h-8 rounded-lg ${isIncome ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'} flex items-center justify-center shrink-0">
            <i class="fa-solid ${isIncome ? 'fa-arrow-down' : 'fa-arrow-up'}"></i>
          </div>
          <div class="min-w-0">
            <div class="font-bold text-slate-800 truncate">${i18n.t(tx.category)}</div>
            <div class="text-[10px] text-slate-400">${tx.date} • ${i18n.t(tx.member)}</div>
          </div>
        </div>
        <div class="${amountClass} font-mono font-bold shrink-0">${formattedAmount}</div>
      `;
      container.appendChild(item);
    });
  }

  renderTransactions() {
    const list = window.storage.getTransactions();
    const tbody = document.getElementById('tx-table-body');
    const mobileContainer = document.getElementById('tx-mobile-list');
    const i18n = window.i18n;

    // Filter
    let filtered = list.filter(tx => {
      let matchMonth = !this.selectedMonth || this.selectedMonth === 'all' || tx.date.startsWith(this.selectedMonth);
      let matchMember = this.selectedMember === 'memberAll' || tx.member === this.selectedMember;
      let matchType = this.selectedType === 'all' || tx.type === this.selectedType;
      let matchSearch = !this.searchQuery || 
        (tx.note && tx.note.toLowerCase().includes(this.searchQuery)) ||
        (i18n.t(tx.category).toLowerCase().includes(this.searchQuery));
      return matchMonth && matchMember && matchType && matchSearch;
    });

    if (tbody) tbody.innerHTML = '';
    if (mobileContainer) mobileContainer.innerHTML = '';

    if (filtered.length === 0) {
      const emptyHtml = `
        <tr>
          <td colspan="7" class="text-center py-8 text-slate-400">
            <i class="fa-regular fa-folder-open text-3xl mb-2 block"></i>
            <span>${i18n.t('noTransactions')}</span>
          </td>
        </tr>`;
      if (tbody) tbody.innerHTML = emptyHtml;
      if (mobileContainer) {
        mobileContainer.innerHTML = `
          <div class="text-center py-10 text-slate-400">
            <i class="fa-regular fa-folder-open text-3xl mb-2 block"></i>
            <span>${i18n.t('noTransactions')}</span>
          </div>`;
      }
      return;
    }

    filtered.forEach(tx => {
      const isIncome = tx.type === 'income';
      const formattedAmount = (isIncome ? '+' : '-') + ' ' + i18n.formatCurrency(tx.amount, tx.currency);
      const amountClass = isIncome ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold';
      const badgeType = isIncome 
        ? '<span class="px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-800 font-semibold">' + i18n.t('typeIncome') + '</span>'
        : '<span class="px-2 py-0.5 text-xs rounded-full bg-rose-100 text-rose-800 font-semibold">' + i18n.t('typeExpense') + '</span>';

      // Desktop Table Row
      if (tbody) {
        const tr = document.createElement('tr');
        tr.className = 'border-b border-slate-100 hover:bg-slate-50/80 transition-colors text-sm';
        tr.innerHTML = `
          <td class="py-3 px-4 font-mono text-xs text-slate-500">${tx.date}</td>
          <td class="py-3 px-4">${badgeType}</td>
          <td class="py-3 px-4 font-medium text-slate-800">${i18n.t(tx.category)}</td>
          <td class="py-3 px-4 text-slate-600">${i18n.t(tx.member)}</td>
          <td class="py-3 px-4 text-slate-500 text-xs">${i18n.t(tx.payment)}</td>
          <td class="py-3 px-4 text-slate-600">${tx.note || '-'}</td>
          <td class="py-3 px-4 text-right ${amountClass}">${formattedAmount}</td>
          <td class="py-3 px-4 text-center">
            <button class="text-slate-400 hover:text-blue-600 p-1 edit-tx-btn" data-id="${tx.id}" title="Edit">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class="text-slate-400 hover:text-rose-600 p-1 ml-1 delete-tx-btn" data-id="${tx.id}" title="Delete">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      }

      // Mobile Card
      if (mobileContainer) {
        const card = document.createElement('div');
        card.className = 'p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between gap-3';
        card.innerHTML = `
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 rounded-xl ${isIncome ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'} flex items-center justify-center shrink-0 text-base">
              <i class="fa-solid ${isIncome ? 'fa-arrow-down' : 'fa-arrow-up'}"></i>
            </div>
            <div class="min-w-0">
              <div class="font-bold text-slate-800 text-sm truncate">${i18n.t(tx.category)}</div>
              <div class="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span>${tx.date}</span>
                <span>•</span>
                <span>${i18n.t(tx.member)}</span>
              </div>
              ${tx.note ? `<div class="text-xs text-slate-500 truncate mt-0.5">${tx.note}</div>` : ''}
            </div>
          </div>
          <div class="text-right shrink-0">
            <div class="text-sm font-extrabold ${amountClass}">${formattedAmount}</div>
            <div class="mt-1 flex items-center justify-end gap-1">
              <button class="text-slate-400 hover:text-blue-600 p-1 text-xs edit-tx-btn" data-id="${tx.id}">
                <i class="fa-regular fa-pen-to-square"></i>
              </button>
              <button class="text-slate-400 hover:text-rose-600 p-1 text-xs delete-tx-btn" data-id="${tx.id}">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>
        `;
        mobileContainer.appendChild(card);
      }
    });

    // Attach Edit & Delete Listeners
    document.querySelectorAll('.delete-tx-btn').forEach(b => {
      b.addEventListener('click', (e) => {
        const id = b.getAttribute('data-id');
        if (confirm(i18n.t('confirmDelete'))) {
          window.storage.deleteTransaction(id);
          this.showToast('បានលុបប្រតិបត្តិការរួចរាល់!');
        }
      });
    });

    document.querySelectorAll('.edit-tx-btn').forEach(b => {
      b.addEventListener('click', (e) => {
        const id = b.getAttribute('data-id');
        this.openTransactionModal(id);
      });
    });
  }

  renderBudgets(budgets, categoryBreakdown) {
    const container = document.getElementById('budget-progress-container');
    if (!container) return;

    container.innerHTML = '';
    const i18n = window.i18n;
    const catKeys = Object.keys(budgets);

    if (catKeys.length === 0) {
      container.innerHTML = `<div class="text-slate-400 text-center py-6">មិនទាន់បានកំណត់កញ្ចប់ថវិកានៅឡើយទេ។</div>`;
      return;
    }

    catKeys.forEach(catKey => {
      const budgetLimitUSD = budgets[catKey] || 0;
      const spentCat = categoryBreakdown.find(c => c.key === catKey);
      const spentUSD = spentCat ? spentCat.amountUSD : 0;
      const percentage = budgetLimitUSD > 0 ? (spentUSD / budgetLimitUSD) * 100 : 0;

      let barColor = 'bg-blue-600';
      let statusBadge = `<span class="text-xs text-blue-600 font-bold">${i18n.t('budgetSafe')}</span>`;

      if (percentage >= 100) {
        barColor = 'bg-rose-500';
        statusBadge = `<span class="text-xs text-rose-600 font-bold">${i18n.t('budgetOver')}</span>`;
      } else if (percentage >= 80) {
        barColor = 'bg-amber-500';
        statusBadge = `<span class="text-xs text-amber-600 font-bold">${i18n.t('budgetWarning')}</span>`;
      }

      const card = document.createElement('div');
      card.className = 'p-4 bg-white rounded-xl border border-slate-200/90 shadow-sm';
      card.innerHTML = `
        <div class="flex items-center justify-between mb-2">
          <div class="font-bold text-slate-800 text-sm">${i18n.t(catKey)}</div>
          <div>${statusBadge}</div>
        </div>
        <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-2">
          <div class="${barColor} h-2.5 rounded-full transition-all duration-500" style="width: ${Math.min(percentage, 100)}%"></div>
        </div>
        <div class="flex items-center justify-between text-xs text-slate-500">
          <span>${i18n.t('budgetSpent')}: <strong>${i18n.formatCurrency(spentUSD, 'USD')}</strong></span>
          <span>${i18n.t('budgetLimit')}: <strong>${i18n.formatCurrency(budgetLimitUSD, 'USD')}</strong> (${percentage.toFixed(0)}%)</span>
        </div>
      `;
      container.appendChild(card);
    });
  }

  renderDebts(debts) {
    const container = document.getElementById('debts-list-container');
    if (!container) return;

    container.innerHTML = '';
    const i18n = window.i18n;

    if (debts.length === 0) {
      container.innerHTML = `<div class="text-slate-400 text-center py-6">គ្មានទិន្នន័យបំណុល ឬកម្ចីទេ។</div>`;
      return;
    }

    debts.forEach(d => {
      const isIOwe = d.type === 'i_owe';
      const isPaid = d.status === 'paid';
      const badge = isIOwe
        ? `<span class="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold">${i18n.t('debtIOwe')}</span>`
        : `<span class="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">${i18n.t('debtOwedToMe')}</span>`;

      const card = document.createElement('div');
      card.className = `p-4 rounded-xl border ${isPaid ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-slate-200 shadow-sm'} flex items-center justify-between gap-4`;
      card.innerHTML = `
        <div>
          <div class="flex items-center gap-2">
            ${badge}
            <span class="font-bold text-slate-800 text-sm ${isPaid ? 'line-through' : ''}">${d.person}</span>
          </div>
          <div class="text-xs text-slate-500 mt-1 flex items-center gap-2">
            <span>${i18n.t('debtDueDate')}: ${d.dueDate || 'គ្មានកាលកំណត់'}</span>
            ${d.note ? `<span>• ${d.note}</span>` : ''}
          </div>
        </div>
        <div class="text-right">
          <div class="font-black text-sm text-slate-800">${i18n.formatCurrency(d.amount, d.currency)}</div>
          <div class="mt-1 flex items-center justify-end gap-2">
            <button class="text-xs px-2.5 py-1 rounded-lg ${isPaid ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'} font-bold toggle-debt-btn" data-id="${d.id}">
              ${isPaid ? i18n.t('debtPending') : i18n.t('debtPaid')}
            </button>
            <button class="text-slate-400 hover:text-rose-600 p-1 text-xs delete-debt-btn" data-id="${d.id}">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    // Listeners
    document.querySelectorAll('.toggle-debt-btn').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-id');
        const target = debts.find(x => x.id === id);
        if (target) {
          window.storage.updateDebt(id, { status: target.status === 'paid' ? 'pending' : 'paid' });
          this.showToast('បានកែប្រែស្ថានភាពរួចរាល់!');
        }
      });
    });

    document.querySelectorAll('.delete-debt-btn').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-id');
        if (confirm(i18n.t('confirmDelete'))) {
          window.storage.deleteDebt(id);
          this.showToast('បានលុបទិន្នន័យរួចរាល់!');
        }
      });
    });
  }

  renderGoals(goals) {
    const container = document.getElementById('goals-list-container');
    if (!container) return;

    container.innerHTML = '';
    const i18n = window.i18n;

    if (goals.length === 0) {
      container.innerHTML = `<div class="text-slate-400 text-center py-6">មិនទាន់បានបង្កើតគោលដៅសន្សំនៅឡើយទេ។</div>`;
      return;
    }

    goals.forEach(g => {
      const progress = g.targetAmount > 0 ? (g.currentAmount / g.targetAmount) * 100 : 0;
      const card = document.createElement('div');
      card.className = 'p-4 bg-white rounded-xl border border-slate-200/90 shadow-sm';
      card.innerHTML = `
        <div class="flex items-center justify-between mb-1.5">
          <div class="font-bold text-slate-800 text-sm">${g.title}</div>
          <span class="text-xs font-mono font-bold text-blue-600">${progress.toFixed(0)}%</span>
        </div>
        <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-2">
          <div class="bg-gradient-to-r from-blue-600 to-emerald-500 h-2.5 rounded-full" style="width: ${Math.min(progress, 100)}%"></div>
        </div>
        <div class="flex items-center justify-between text-xs text-slate-500">
          <span>${i18n.t('goalCurrent')}: <strong>${i18n.formatCurrency(g.currentAmount, g.currency)}</strong></span>
          <span>${i18n.t('goalTarget')}: <strong>${i18n.formatCurrency(g.targetAmount, g.currency)}</strong></span>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Transaction Modal Open
  openTransactionModal(editId = null) {
    this.editingTxId = editId;
    const modal = document.getElementById('modal-transaction');
    const title = document.getElementById('modal-tx-title');
    const form = document.getElementById('form-transaction');
    const today = new Date().toISOString().slice(0, 10);

    form.reset();
    document.getElementById('tx-date').value = today;

    if (editId) {
      const list = window.storage.getTransactions();
      const tx = list.find(t => t.id === editId);
      if (tx) {
        title.textContent = window.i18n.t('modalEditTitle');
        document.getElementById('tx-type').value = tx.type;
        document.getElementById('tx-amount').value = tx.amount;
        document.getElementById('tx-currency').value = tx.currency;
        document.getElementById('tx-category').value = tx.category;
        document.getElementById('tx-date').value = tx.date;
        document.getElementById('tx-member').value = tx.member;
        document.getElementById('tx-payment').value = tx.payment;
        document.getElementById('tx-note').value = tx.note || '';
      }
    } else {
      title.textContent = window.i18n.t('modalAddTitle');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  saveTransaction() {
    const type = document.getElementById('tx-type').value;
    const amount = parseFloat(document.getElementById('tx-amount').value) || 0;
    const currency = document.getElementById('tx-currency').value;
    const category = document.getElementById('tx-category').value;
    const date = document.getElementById('tx-date').value || new Date().toISOString().slice(0, 10);
    const member = document.getElementById('tx-member').value;
    const payment = document.getElementById('tx-payment').value;
    const note = document.getElementById('tx-note').value;

    if (amount <= 0) {
      alert(window.i18n.getLanguage() === 'km' ? 'សូមបញ្ចូលចំនួនទឹកប្រាក់!' : 'Please enter an amount!');
      return;
    }

    const data = { type, amount, currency, category, date, member, payment, note };

    if (this.editingTxId) {
      window.storage.updateTransaction(this.editingTxId, data);
      this.showToast(window.i18n.getLanguage() === 'km' ? '✅ បានកែប្រែទិន្នន័យជោគជ័យ!' : '✅ Updated successfully!');
    } else {
      window.storage.addTransaction(data);
      // Auto adjust month filter to match the newly added transaction if not on 'all'
      const txMonth = date.substring(0, 7);
      if (this.selectedMonth !== 'all' && this.selectedMonth !== txMonth) {
        this.selectedMonth = txMonth;
        const monthSelect = document.getElementById('filter-month');
        if (monthSelect) monthSelect.value = txMonth;
      }
      const isKm = window.i18n.getLanguage() === 'km';
      const catName = window.i18n.t(category);
      const formattedAmt = window.i18n.formatCurrency(amount, currency);
      this.showToast(isKm ? `✅ បានកត់ត្រាជោគជ័យ! (${formattedAmt} - ${catName})` : `✅ Saved successfully! (${formattedAmt} - ${catName})`);
    }

    this.closeModal('modal-transaction');
  }

  saveBudget() {
    const cat = document.getElementById('budget-category').value;
    const amt = parseFloat(document.getElementById('budget-amount').value) || 0;
    window.storage.saveBudget(cat, amt);
    this.showToast('✅ បានរក្សាទុកកញ្ចប់ថវិកាជោគជ័យ!');
    this.closeModal('modal-budget');
  }

  saveDebt() {
    const type = document.getElementById('debt-type').value;
    const person = document.getElementById('debt-person').value;
    const amount = parseFloat(document.getElementById('debt-amount').value) || 0;
    const currency = document.getElementById('debt-currency').value;
    const dueDate = document.getElementById('debt-due-date').value;
    const note = document.getElementById('debt-note').value;

    window.storage.addDebt({ type, person, amount, currency, dueDate, note, status: 'pending' });
    this.showToast('✅ បានកត់ត្រាបំណុល/កម្ចីជោគជ័យ!');
    this.closeModal('modal-debt');
  }

  saveGoal() {
    const title = document.getElementById('goal-title-input').value;
    const targetAmount = parseFloat(document.getElementById('goal-target-amount').value) || 0;
    const currentAmount = parseFloat(document.getElementById('goal-current-amount').value) || 0;
    const currency = document.getElementById('goal-currency').value;
    const targetDate = document.getElementById('goal-target-date').value;

    window.storage.addGoal({ title, targetAmount, currentAmount, currency, targetDate });
    this.showToast('✅ បានបង្កើតគោលដៅសន្សំជោគជ័យ!');
    this.closeModal('modal-goal');
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
