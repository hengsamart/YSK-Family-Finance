/**
 * YSK Family Finance - Charts Visualization Manager
 * Built with Chart.js
 */

class ChartsManager {
  constructor() {
    this.expensePieChart = null;
    this.monthlyTrendChart = null;
    this.dailyCashFlowChart = null;
  }

  // Render or update Expense Doughnut Chart
  renderExpensePie(canvasId, categoryData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    if (this.expensePieChart) {
      this.expensePieChart.destroy();
    }

    if (!categoryData || categoryData.length === 0) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const labels = categoryData.map(c => c.name);
    const data = categoryData.map(c => window.i18n.convertToDisplay(c.amountUSD, 'USD'));

    // Vibrant Modern Color Palette
    const colors = [
      '#3b82f6', // blue
      '#10b981', // emerald
      '#f59e0b', // amber
      '#ef4444', // red
      '#8b5cf6', // purple
      '#ec4899', // pink
      '#06b6d4', // cyan
      '#84cc16', // lime
      '#6366f1', // indigo
      '#14b8a6'  // teal
    ];

    this.expensePieChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors.slice(0, data.length),
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: {
                family: "'Kantumruy Pro', 'Inter', sans-serif",
                size: 12
              },
              boxWidth: 14,
              padding: 12
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const val = context.raw || 0;
                const formatted = window.i18n.displayCurrency === 'KHR'
                  ? Math.round(val).toLocaleString() + ' ៛'
                  : '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                return ` ${label}: ${formatted}`;
              }
            }
          }
        }
      }
    });
  }

  // Render Monthly Trend Bar Chart
  renderMonthlyTrend(canvasId, trendData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    if (this.monthlyTrendChart) {
      this.monthlyTrendChart.destroy();
    }

    const labels = trendData.map(m => m.label);
    const incomes = trendData.map(m => window.i18n.convertToDisplay(m.incomeUSD, 'USD'));
    const expenses = trendData.map(m => window.i18n.convertToDisplay(m.expenseUSD, 'USD'));

    this.monthlyTrendChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: window.i18n.t('typeIncome'),
            data: incomes,
            backgroundColor: 'rgba(16, 185, 129, 0.85)', // emerald
            borderColor: '#10b981',
            borderRadius: 6,
            borderWidth: 1
          },
          {
            label: window.i18n.t('typeExpense'),
            data: expenses,
            backgroundColor: 'rgba(239, 68, 68, 0.85)', // rose
            borderColor: '#ef4444',
            borderRadius: 6,
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                family: "'Kantumruy Pro', 'Inter', sans-serif",
                size: 13
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const val = context.raw || 0;
                const formatted = window.i18n.displayCurrency === 'KHR'
                  ? Math.round(val).toLocaleString() + ' ៛'
                  : '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                return ` ${context.dataset.label}: ${formatted}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                family: "'Kantumruy Pro', 'Inter', sans-serif"
              },
              callback: function(val) {
                if (window.i18n.displayCurrency === 'KHR') {
                  return (val / 1000).toFixed(0) + 'k ៛';
                }
                return '$' + val;
              }
            },
            grid: {
              color: 'rgba(226, 232, 240, 0.6)'
            }
          },
          x: {
            ticks: {
              font: {
                family: "'Kantumruy Pro', 'Inter', sans-serif"
              }
            },
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
}

// Global charts singleton
window.charts = new ChartsManager();
