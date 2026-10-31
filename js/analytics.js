/**
 * YSK Family Finance - Smart Analytics Engine
 * Calculates financial metrics, category breakdowns, health scores, and smart insights.
 */

class AnalyticsEngine {
  constructor() {}

  // Filter transactions by selected month (YYYY-MM) and member
  filterTransactions(transactions, monthStr = null, member = 'memberAll') {
    return transactions.filter(tx => {
      let matchMonth = true;
      if (monthStr && monthStr !== 'all') {
        matchMonth = tx.date.startsWith(monthStr);
      }
      let matchMember = true;
      if (member && member !== 'memberAll') {
        matchMember = tx.member === member;
      }
      return matchMonth && matchMember;
    });
  }

  // Calculate high-level financial summary
  calculateSummary(transactions, monthStr = null, member = 'memberAll') {
    const list = this.filterTransactions(transactions, monthStr, member);
    const i18n = window.i18n;

    let totalIncomeUSD = 0;
    let totalExpenseUSD = 0;

    list.forEach(tx => {
      const amountUSD = i18n.toBaseUSD(parseFloat(tx.amount) || 0, tx.currency);
      if (tx.type === 'income') {
        totalIncomeUSD += amountUSD;
      } else {
        totalExpenseUSD += amountUSD;
      }
    });

    const netSavingsUSD = totalIncomeUSD - totalExpenseUSD;
    const savingsRate = totalIncomeUSD > 0 ? (netSavingsUSD / totalIncomeUSD) * 100 : 0;

    // Overall family balance (all-time)
    let totalBalanceUSD = 0;
    transactions.forEach(tx => {
      const amountUSD = i18n.toBaseUSD(parseFloat(tx.amount) || 0, tx.currency);
      if (tx.type === 'income') {
        totalBalanceUSD += amountUSD;
      } else {
        totalBalanceUSD -= amountUSD;
      }
    });

    return {
      totalIncomeUSD,
      totalExpenseUSD,
      netSavingsUSD,
      savingsRate: Math.max(0, savingsRate),
      totalBalanceUSD,
      transactionCount: list.length
    };
  }

  // Group expenses by category
  getCategoryBreakdown(transactions, monthStr = null, member = 'memberAll', type = 'expense') {
    const list = this.filterTransactions(transactions, monthStr, member).filter(tx => tx.type === type);
    const i18n = window.i18n;
    const totals = {};
    let grandTotalUSD = 0;

    list.forEach(tx => {
      const amountUSD = i18n.toBaseUSD(parseFloat(tx.amount) || 0, tx.currency);
      totals[tx.category] = (totals[tx.category] || 0) + amountUSD;
      grandTotalUSD += amountUSD;
    });

    const categories = Object.keys(totals).map(catKey => {
      const amountUSD = totals[catKey];
      const percentage = grandTotalUSD > 0 ? (amountUSD / grandTotalUSD) * 100 : 0;
      return {
        key: catKey,
        name: i18n.t(catKey),
        amountUSD: amountUSD,
        percentage: percentage
      };
    });

    // Sort descending by amount
    return categories.sort((a, b) => b.amountUSD - a.amountUSD);
  }

  // Calculate monthly trajectory for the last 6 months
  getMonthlyTrend(transactions, numMonths = 6) {
    const i18n = window.i18n;
    const months = [];
    const today = new Date();

    for (let i = numMonths - 1; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const year = d.getFullYear();
      const monthNum = String(d.getMonth() + 1).padStart(2, '0');
      const key = `${year}-${monthNum}`;
      
      const monthName = d.toLocaleDateString(i18n.getLanguage() === 'km' ? 'km-KH' : 'en-US', { month: 'short' });
      months.push({ key, label: monthName, incomeUSD: 0, expenseUSD: 0 });
    }

    transactions.forEach(tx => {
      const txMonth = tx.date.substring(0, 7);
      const target = months.find(m => m.key === txMonth);
      if (target) {
        const valUSD = i18n.toBaseUSD(parseFloat(tx.amount) || 0, tx.currency);
        if (tx.type === 'income') {
          target.incomeUSD += valUSD;
        } else {
          target.expenseUSD += valUSD;
        }
      }
    });

    return months;
  }

  // Calculate Financial Health Score (0 - 100)
  calculateHealthScore(summary, budgets, debts, goals) {
    let score = 50; // Base score

    // Factor 1: Savings Rate (up to +30 pts or -20 pts)
    if (summary.savingsRate >= 30) {
      score += 30;
    } else if (summary.savingsRate >= 20) {
      score += 20;
    } else if (summary.savingsRate >= 10) {
      score += 10;
    } else if (summary.savingsRate < 0) {
      score -= 20;
    }

    // Factor 2: Budget Control (up to +15 pts)
    const hasBudgets = Object.keys(budgets).length > 0;
    if (hasBudgets) {
      score += 10;
      // Bonus if not running deficit
      if (summary.netSavingsUSD >= 0) {
        score += 5;
      }
    }

    // Factor 3: Goals Progress (up to +10 pts)
    if (goals && goals.length > 0) {
      const fundedGoals = goals.filter(g => g.currentAmount > 0);
      if (fundedGoals.length > 0) score += 5;
    }

    // Cap between 0 and 100
    score = Math.min(100, Math.max(10, Math.round(score)));

    let statusKey = 'healthGood';
    let badgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-300';

    if (score >= 85) {
      statusKey = 'healthExcellent';
      badgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-400';
    } else if (score >= 70) {
      statusKey = 'healthGood';
      badgeClass = 'bg-blue-100 text-blue-800 border-blue-400';
    } else if (score >= 50) {
      statusKey = 'healthFair';
      badgeClass = 'bg-amber-100 text-amber-800 border-amber-400';
    } else {
      statusKey = 'healthAlert';
      badgeClass = 'bg-rose-100 text-rose-800 border-rose-400';
    }

    return {
      score,
      statusKey,
      statusText: window.i18n.t(statusKey),
      badgeClass
    };
  }

  // Generate Smart Insights / Financial Advice
  generateSmartInsights(summary, categoryBreakdown, budgets) {
    const isKm = window.i18n.getLanguage() === 'km';
    const insights = [];

    // Insight 1: Savings Performance
    if (summary.savingsRate >= 25) {
      insights.push({
        type: 'success',
        icon: 'fa-trophy',
        text: isKm 
          ? `អបអរសាទរ! អត្រាសន្សំគ្រួសាររបស់អ្នកឡើងដល់ ${summary.savingsRate.toFixed(1)}% ក្នុងខែនេះ លើសពីគោលដៅស្តង់ដារ ២០%។`
          : `Great job! Your family savings rate reached ${summary.savingsRate.toFixed(1)}% this month, exceeding the 20% benchmark.`
      });
    } else if (summary.netSavingsUSD < 0) {
      insights.push({
        type: 'danger',
        icon: 'fa-triangle-exclamation',
        text: isKm 
          ? `ការព្រមាន៖ ការចំណាយក្នុងខែនេះលើសពីចំណូល ${window.i18n.formatCurrency(Math.abs(summary.netSavingsUSD))}។ សូមកាត់បន្ថយចំណាយមិនចាំបាច់។`
          : `Warning: Expenses exceeded income by ${window.i18n.formatCurrency(Math.abs(summary.netSavingsUSD))}. Review non-essential spending.`
      });
    }

    // Insight 2: Top Expense Category
    if (categoryBreakdown.length > 0) {
      const top = categoryBreakdown[0];
      insights.push({
        type: 'info',
        icon: 'fa-chart-pie',
        text: isKm
          ? `ចំណាយច្រើនជាងគេក្នុងខែនេះគឺលើ "${top.name}" ចំនួន ${window.i18n.formatCurrency(top.amountUSD)} (${top.percentage.toFixed(1)}% នៃចំណាយសរុប)។`
          : `Top expense this month is "${top.name}" at ${window.i18n.formatCurrency(top.amountUSD)} (${top.percentage.toFixed(1)}% of total).`
      });
    }

    // Insight 3: Emergency Fund & Budgeting
    insights.push({
      type: 'tip',
      icon: 'fa-lightbulb',
      text: isKm
        ? `យោបល់ឆ្លាតវៃ៖ គួររក្សាទុកកញ្ចប់ប្រាក់សន្សំគ្រាអាសន្នយ៉ាងតិចស្មើនឹងការចំណាយ ៣ ទៅ ៦ ខែ ដើម្បីធានាសុវត្ថិភាពគ្រួសារ។`
        : `Smart Tip: Aim to maintain an emergency fund equal to 3 to 6 months of living expenses for family resilience.`
    });

    return insights;
  }
}

// Global analytics singleton
window.analytics = new AnalyticsEngine();
