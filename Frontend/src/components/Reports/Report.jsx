import React, { useMemo, useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import { useExpense } from "../../context/expenseContext";
import { useIncome } from "../../context/incomeContext";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  FaArrowUp,
  FaArrowDown,
  FaLeaf,
  FaMoneyBillWave,
  FaBalanceScale,
} from "react-icons/fa";

const RANGE_OPTIONS = [
  { label: "Last 3 months", value: 3 },
  { label: "Last 6 months", value: 6 },
  { label: "Last 12 months", value: 12 },
];

const formatCurrency = (value = 0) =>
  `₹${Number(value).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;

const parseDate = (input) => {
  const fallback = new Date();
  if (!input) return fallback;
  const parsed = new Date(input);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
};

const getMonthKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
const getMonthLabel = (date) => date.toLocaleString("en-US", { month: "short", year: "2-digit" });

const Report = () => {
  const { expenses, loading: expenseLoading } = useExpense();
  const { incomes, loading: incomeLoading } = useIncome();
  const [monthRange, setMonthRange] = useState(RANGE_OPTIONS[1].value);

  const loading = expenseLoading || incomeLoading;

  const totalExpense = useMemo(
    () => (expenses || []).reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [expenses]
  );

  const totalIncome = useMemo(
    () => (incomes || []).reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [incomes]
  );

  const netSavings = totalIncome - totalExpense;

  const monthlySeries = useMemo(() => {
    const map = new Map();

    (expenses || []).forEach((expense) => {
      const date = parseDate(expense.createdAt || expense.date);
      const key = getMonthKey(date);
      const current = map.get(key) || {
        key,
        label: getMonthLabel(date),
        sortDate: date,
        expense: 0,
        income: 0,
      };
      current.expense += Number(expense.amount || 0);
      map.set(key, current);
    });

    (incomes || []).forEach((income) => {
      const date = parseDate(income.createdAt || income.date);
      const key = getMonthKey(date);
      const current = map.get(key) || {
        key,
        label: getMonthLabel(date),
        sortDate: date,
        expense: 0,
        income: 0,
      };
      current.income += Number(income.amount || 0);
      map.set(key, current);
    });

    return Array.from(map.values())
      .sort((a, b) => a.sortDate - b.sortDate)
      .map((item) => ({ ...item, net: item.income - item.expense }));
  }, [expenses, incomes]);

  const visibleSeries = useMemo(() => {
    if (!monthlySeries.length) return [];
    const startIndex = Math.max(monthlySeries.length - monthRange, 0);
    return monthlySeries.slice(startIndex);
  }, [monthlySeries, monthRange]);

  const categoryBreakdown = useMemo(() => {
    const tally = new Map();
    (expenses || []).forEach((expense) => {
      const category = expense.category || "Uncategorized";
      tally.set(category, (tally.get(category) || 0) + Number(expense.amount || 0));
    });
    return Array.from(tally.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  const topCategories = categoryBreakdown.slice(0, 4);

  const recentActivity = useMemo(() => {
    const normalize = (item, type) => ({
      id: item._id || item.id,
      type,
      amount: Number(item.amount || 0),
      description: item.description || (type === "income" ? "Income" : "Expense"),
      category: item.category || (type === "income" ? "Income" : "Expense"),
      date: parseDate(item.createdAt || item.date || item.updatedAt || Date.now()),
    });

    const combined = [
      ...(incomes || []).map((item) => normalize(item, "income")),
      ...(expenses || []).map((item) => normalize(item, "expense")),
    ];

    return combined
      .sort((a, b) => b.date - a.date)
      .slice(0, 6)
      .map((item) => ({
        ...item,
        formattedDate: item.date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      }));
  }, [expenses, incomes]);

  const averageMonthlySpend = monthlySeries.length
    ? totalExpense / monthlySeries.length
    : totalExpense;

  const averageMonthlyIncome = monthlySeries.length
    ? totalIncome / monthlySeries.length
    : totalIncome;

  const COLORS = ["#0f766e", "#14b8a6", "#2dd4bf", "#99f6e4", "#0d9488"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-slate-100">
      <Sidebar />
      <div className="md:ml-64 ml-0 p-4 md:p-8 transition-all">
        <div className="max-w-7xl mx-auto space-y-8 group-container">
          <header className="bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-500 text-white rounded-3xl shadow-2xl p-8 flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <p className="uppercase tracking-[0.3em] text-sm text-white/70 mb-2">Insight Center</p>
                <h1 className="text-4xl font-black tracking-tight">Financial Reports</h1>
                <p className="text-white/80 mt-2 max-w-2xl">
                  Monitor your income, spending, and savings trajectory with immersive teal visuals and live data pulled from your ExpenseEase activity.
                </p>
              </div>
              <div className="self-start inline-flex bg-white/90 text-teal-700 px-4 py-3 rounded-2xl shadow-lg text-sm font-semibold gap-3">
                <FaLeaf className="text-2xl" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-teal-500">Net Position</p>
                  <p className="text-xl font-bold">{formatCurrency(netSavings)}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {RANGE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setMonthRange(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    monthRange === option.value
                      ? "bg-white text-teal-600 shadow-md"
                      : "bg-white/20 text-white/80 hover:bg-white/30"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </header>

          {/* KPI Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Total Income",
                value: formatCurrency(totalIncome),
                icon: <FaArrowUp className="text-emerald-500" />,
                sub: `Avg. ${formatCurrency(Math.round(averageMonthlyIncome || 0))} / mo`,
                className: "from-emerald-50 to-white",
              },
              {
                label: "Total Expense",
                value: formatCurrency(totalExpense),
                icon: <FaArrowDown className="text-rose-500" />,
                sub: `Avg. ₹${Math.round(averageMonthlySpend || 0).toLocaleString("en-IN")} / mo`,
                className: "from-rose-50 to-white",
              },
              {
                label: "Net Savings",
                value: formatCurrency(netSavings),
                icon: <FaMoneyBillWave className="text-teal-500" />,
                sub: netSavings >= 0 ? "On track" : "Overspending",
                className: "from-teal-50 to-white",
              },
              {
                label: "Active Months",
                value: monthlySeries.length.toString().padStart(2, "0"),
                icon: <FaBalanceScale className="text-cyan-500" />,
                sub: "Tracked periods",
                className: "from-cyan-50 to-white",
              },
            ].map((card) => (
              <div
                key={card.label}
                className={`bg-gradient-to-br ${card.className} rounded-2xl p-5 border border-white shadow-md`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-slate-500">{card.label}</span>
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-inner">
                    {card.icon}
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800">{card.value}</p>
                <p className="text-xs uppercase tracking-widest text-slate-400 mt-2">{card.sub}</p>
              </div>
            ))}
          </section>

          {/* Charts Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800">Income vs Expense Trend</h2>
                <span className="text-xs font-semibold uppercase tracking-widest text-teal-500">{monthRange} month view</span>
              </div>
              {loading ? (
                <div className="h-64 flex items-center justify-center text-slate-400">Loading...</div>
              ) : visibleSeries.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-slate-400">No data yet</div>
              ) : (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={visibleSeries}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="label" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Line type="monotone" dataKey="income" stroke="#0f766e" strokeWidth={3} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="expense" stroke="#94a3b8" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Spending by Category</h2>
              {categoryBreakdown.length === 0 ? (
                <p className="text-sm text-slate-500">Add expenses to unlock this insight.</p>
              ) : (
                <div>
                  <div className="h-56">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={categoryBreakdown}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={45}
                          outerRadius={80}
                          paddingAngle={3}
                        >
                          {categoryBreakdown.map((entry, index) => (
                            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {topCategories.map((cat, index) => (
                      <li key={cat.name} className="flex items-center justify-between text-sm text-slate-600">
                        <span className="inline-flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></span>
                          {cat.name}
                        </span>
                        <span className="font-semibold text-slate-800">{formatCurrency(cat.value)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Bar chart + Activity */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Monthly Net Savings</h2>
              {visibleSeries.length === 0 ? (
                <div className="h-60 flex items-center justify-center text-slate-400">No data yet</div>
              ) : (
                <div className="h-60">
                  <ResponsiveContainer>
                    <BarChart data={visibleSeries}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="label" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Bar dataKey="net" radius={[8, 8, 0, 0]} fill="#14b8a6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Activity</h2>
              {recentActivity.length === 0 ? (
                <p className="text-sm text-slate-500">Track income or expense to populate this feed.</p>
              ) : (
                <ul className="space-y-3">
                  {recentActivity.map((item) => (
                    <li
                      key={`${item.id}-${item.type}-${item.date.toISOString()}`}
                      className="flex items-center justify-between bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{item.description}</p>
                        <p className="text-xs uppercase tracking-widest text-slate-400">
                          {item.category} • {item.formattedDate}
                        </p>
                      </div>
                      <span
                        className={`text-base font-bold ${
                          item.type === "income" ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {item.type === "income" ? "+" : "-"}
                        {formatCurrency(item.amount).replace("₹", "")}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Report;