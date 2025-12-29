import React, { use, useMemo, useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import {
    FiTrendingUp,
    FiTrendingDown,
    FiPlus,
    FiSearch,
    FiFilter,
    FiDownload,
    FiActivity,
} from "react-icons/fi";

const filterOptions = [
    { key: "all", label: "All" },
    { key: "receivable", label: "You Receive" },
    { key: "payable", label: "You Pay" },
];

const MyKhataBook = ({loading}) => {
    const [activeFilter, setActiveFilter] = useState("all");
    const [search, setSearch] = useState("");

    const ledgerEntries = useMemo(
        () => [
            {
                id: "TRX-2024-9801",
                counterpart: "Urban Threads Studio",
                avatar: "UT",
                date: "2024-12-10",
                tag: "Freelance",
                amount: 18500,
                type: "receivable",
                status: "due in 4d",
            },
            {
                id: "TRX-2024-9802",
                counterpart: "Lucent Logistics",
                avatar: "LL",
                date: "2024-12-09",
                tag: "Inventory",
                amount: 7200,
                type: "payable",
                status: "overdue",
            },
            {
                id: "TRX-2024-9803",
                counterpart: "Mira Patel",
                avatar: "MP",
                date: "2024-12-07",
                tag: "Personal",
                amount: 2500,
                type: "receivable",
                status: "cleared",
            },
            {
                id: "TRX-2024-9804",
                counterpart: "Nimbus Print Co",
                avatar: "NP",
                date: "2024-12-01",
                tag: "Printing",
                amount: 12800,
                type: "payable",
                status: "due today",
            },
        ],
        []
    );

    const filteredEntries = ledgerEntries.filter((entry) => {
        const matchesFilter =
            activeFilter === "all" ? true : entry.type === activeFilter;
        const matchesSearch = entry.counterpart
            .toLowerCase()
            .includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const receivable = ledgerEntries
        .filter((entry) => entry.type === "receivable")
        .reduce((sum, entry) => sum + entry.amount, 0);
    const payable = ledgerEntries
        .filter((entry) => entry.type === "payable")
        .reduce((sum, entry) => sum + entry.amount, 0);

    const projection = (receivable - payable) * 1.08;

    /* -------- Loading -------- */
   if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="text-center max-w-7xl mx-auto group-container">
					<div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600 mb-4">
					</div>
					<h3 className="text-xl font-semibold text-teal-600">Loading
            <span className="animate-pulse">.</span><span className="animate-pulse delay-150">.</span><span className="animate-pulse delay-300">.</span>
          </h3>
          <p>Please wait while we fetch your data.</p>
				</div>
			</div>
		);
	}

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 transition-colors duration-300">
            <Sidebar />
            <div className="md:ml-64 pt-16 md:pt-0 transition-all duration-300">
                <div className="p-6 pt-8">
                    <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10">
                        <header className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                            <div className="flex flex-wrap items-center justify-between gap-6">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/80">
                                        My Khata • Smart Ledger
                                    </p>
                                    <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
                                        Quietly Powerful Ledger Intelligence
                                    </h1>
                                    <p className="mt-4 max-w-2xl text-base text-white/70">
                                        Command receivables, payables, and settlements with a cinematic
                                        workspace. Every card is a signal, every color an intent.
                                    </p>
                                </div>
                                <div className="flex flex-shrink-0 gap-3">
                                    <button className="flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-400/80 hover:text-white">
                                        <FiDownload className="text-lg" /> Export Snapshot
                                    </button>
                                    <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-gray-900 shadow-[0_15px_40px_rgba(34,211,238,0.35)] transition hover:-translate-y-0.5">
                                        <FiPlus className="text-lg" /> New Entry
                                    </button>
                                </div>
                            </div>
                        </header>

                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="bg-white rounded-2xl p-6 text-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
                                        Receivable
                                    </p>
                                    <span className="rounded-full bg-green-200 p-3 text-green-500">
                                        <FiTrendingUp />
                                    </span>
                                </div>
                                <p className="mt-4 text-4xl font-semibold tracking-tight text-green-700">
                                    ₹{receivable.toLocaleString()}
                                </p>
                                <p className="mt-2 text-sm text-gray-600">Expected within 7 days</p>
                            </div>


                            <div className="bg-white rounded-2xl p-6 text-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
                                        Payable
                                    </p>
                                    <span className="rounded-full bg-red-200 p-3 text-red-500">
                                        <FiTrendingDown />
                                    </span>
                                </div>
                                <p className="mt-4 text-4xl font-semibold tracking-tight text-red-500">
                                    ₹{payable.toLocaleString()}
                                </p>
                                <p className="mt-2 text-sm text-gray-600">Schedule payouts before Friday</p>
                            </div>


                            <div className="bg-white rounded-2xl p-6 text-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
                                        Projection
                                    </p>
                                    <span className="rounded-full bg-teal-200 p-3 text-teal-500">
                                        <FiActivity />
                                    </span>
                                </div>
                                <p className="mt-4 text-4xl font-semibold tracking-tight text-teal-500">
                                    ₹{projection.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </p>
                                <p className="mt-2 text-sm text-gray-600">
                                    Forecast with 8% liquidity buffer
                                </p>
                            </div>




                        </div>

                        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                            <div className="rounded-3xl border border-teal-100/10 bg-white p-6 backdrop-blur-xl">
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex items-center gap-3 rounded-2xl border border-teal-100/10 bg-gray-100 px-3 py-3">
                                        <FiSearch className="text-gray-500" />
                                        <input
                                            className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 bg-white text-gray-900 outline-none"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Find vendors, clients, or notes"
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {filterOptions.map((option) => (
                                            <button
                                                key={option.key}
                                                onClick={() => setActiveFilter(option.key)}
                                                className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${activeFilter === option.key
                                                    ? "bg-white text-teal-500 border border-teal-300"
                                                    : "border border-gray-300 text-gray-600 hover:border-gray-400"
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                        <button className="flex items-center gap-2 rounded-2xl border border-gray-300 px-4 py-2 text-sm text-gray-600 transition hover:border-gray-400">
                                            <FiFilter /> Filters
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-4">
                                    {filteredEntries.map((entry) => (
                                        <article
                                            key={entry.id}
                                            className="group flex flex-wrap items-center gap-4 rounded-3xl border border-teal-50/10 bg-teal-100/10 px-5 py-4 transition hover:border-cyan-400/30 hover:bg-white/10"
                                        >
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100/10 text-lg font-semibold text-teal-400">
                                                {entry.avatar}
                                            </div>
                                            <div className="flex min-w-[180px] flex-1 flex-col">
                                                <p className="text-base font-semibold tracking-wide">
                                                    {entry.counterpart}
                                                </p>
                                                <span className="text-xs uppercase tracking-[0.35em] text-gray-500">
                                                    {entry.tag}
                                                </span>
                                            </div>
                                            <div className="min-w-[140px] text-sm text-gray-600">
                                                {new Date(entry.date).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                })}
                                            </div>
                                            <div className="min-w-[160px] text-right text-xl font-semibold">
                                                <span
                                                    className={
                                                        entry.type === "receivable"
                                                            ? "text-green-500"
                                                            : "text-red-500"
                                                    }
                                                >
                                                    {entry.type === "receivable" ? "+" : "-"}₹
                                                    {entry.amount.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/60">
                                                <span
                                                    className={`inline-flex h-2 w-2 rounded-full ${entry.status.includes("over")
                                                        ? "bg-rose-400"
                                                        : entry.status.includes("due")
                                                            ? "bg-amber-300"
                                                            : "bg-emerald-400"
                                                        }`}
                                                />
                                                {entry.status}
                                            </div>
                                        </article>
                                    ))}

                                    {!filteredEntries.length && (
                                        <div className="rounded-3xl border border-white/10 bg-transparent px-6 py-10 text-center text-white/50">
                                            No entries match your filter.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="rounded-3xl border border-cyan-400/30 bg-gradient-to-b from-cyan-400/20 via-slate-900/60 to-slate-900/80 p-6 shadow-[0_20px_60px_rgba(34,211,238,0.4)]">
                                    <p className="text-sm uppercase tracking-[0.45em] text-cyan-200/80">
                                        Timeline
                                    </p>
                                    <ul className="mt-6 space-y-5">
                                        {ledgerEntries.slice(0, 3).map((entry) => (
                                            <li key={entry.id} className="flex items-start gap-4">
                                                <span className="mt-1 h-3 w-3 rounded-full bg-white" />
                                                <div>
                                                    <p className="text-sm text-white/60">
                                                        {new Date(entry.date).toLocaleDateString("en-GB", {
                                                            day: "2-digit",
                                                            month: "short",
                                                        })}
                                                    </p>
                                                    <p className="text-base font-semibold text-white">
                                                        {entry.counterpart}
                                                    </p>
                                                    <p className="text-sm text-white/70">
                                                        {entry.type === "receivable" ? "Receivable" : "Payable"} · ₹
                                                        {entry.amount.toLocaleString()}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80">
                                    <h3 className="text-lg font-semibold text-white">Micro Playbook</h3>
                                    <p className="mt-2 text-sm">
                                        Anchor payouts to sunrise slots, keep receivables inside the same
                                        week, and schedule nudges with a disarming tone.
                                    </p>
                                    <div className="mt-6 flex flex-col gap-3 text-sm">
                                        <div className="rounded-2xl border border-white/10 px-4 py-3">
                                            <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                                                Today · 11:00
                                            </p>
                                            <p className="mt-1 text-white">Ping Lucent Logistics softly</p>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 px-4 py-3">
                                            <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                                                Friday · 18:30
                                            </p>
                                            <p className="mt-1 text-white">Lock receivables reconciliation</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyKhataBook;

