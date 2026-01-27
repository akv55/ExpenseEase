import React, { useEffect, useMemo, useState } from "react";
import { FaBell, FaUsers, FaUserShield } from "react-icons/fa";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import Sidebar from "../Layouts/Sidebar";
import { useGroup } from "../../context/groupContext";
import { toast } from "react-toastify";

const formatDate = (value) => {
    if (!value) return "---";
    const date = new Date(value);
    if (Number.isNaN(date)) return "---";
    return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const tabs = [
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Accepted" },
    { value: "declined", label: "Declined" },
    { value: "all", label: "All" },
];

const Notifications = () => {
    const { invites, invitesLoading, fetchInvites, respondToInvite } = useGroup();
    const [filter, setFilter] = useState("pending");
    const [actionLoading, setActionLoading] = useState(null);
    const inviteList = Array.isArray(invites) ? invites : [];

    useEffect(() => {
        const load = async () => {
            try {
                await fetchInvites(filter);
            } catch (error) {
                toast.error("Unable to load invites right now.");
            }
        };
        load();
    }, [fetchInvites, filter]);

    const inviteStats = useMemo(() => {
        if (!inviteList.length) return { pending: 0, accepted: 0, declined: 0 };
        return inviteList.reduce(
            (acc, invite) => {
                acc[invite.status] = (acc[invite.status] || 0) + 1;
                return acc;
            },
            { pending: 0, accepted: 0, declined: 0 }
        );
    }, [inviteList]);

    const handleRespond = async (invite, action) => {
        try {
            setActionLoading(`${invite._id}-${action}`);
            await respondToInvite(invite._id, action);
            toast.success(`Invite ${action === "accept" ? "accepted" : "declined"}.`);
            await fetchInvites(filter);
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                "Failed to update invite.";
            toast.error(message);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
            <Sidebar />
            <div className="md:ml-64 p-4 md:p-8">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-3xl p-8 shadow-xl mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div>
                                <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
                                    <FaBell className="text-amber-200" /> Group Invites
                                </h1>
                            </div>
                            {/* <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-white/15 rounded-2xl p-4">
                                    <p className="text-xs uppercase tracking-wide text-white/80">Pending</p>
                                    <p className="text-3xl font-bold">{inviteStats.pending || 0}</p>
                                </div>
                                <div className="bg-white/15 rounded-2xl p-4">
                                    <p className="text-xs uppercase tracking-wide text-white/80">Accepted</p>
                                    <p className="text-3xl font-bold">{inviteStats.accepted || 0}</p>
                                </div>
                                <div className="bg-white/15 rounded-2xl p-4">
                                    <p className="text-xs uppercase tracking-wide text-white/80">Declined</p>
                                    <p className="text-3xl font-bold">{inviteStats.declined || 0}</p>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 mb-8">
                        <div className="flex flex-wrap gap-3 px-6 py-4 border-b border-slate-100">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    onClick={() => setFilter(tab.value)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                                        filter === tab.value
                                            ? "bg-teal-500 text-white shadow-lg"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="p-6 space-y-4">
                            {invitesLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map((item) => (
                                        <div
                                            key={item}
                                            className="animate-pulse rounded-2xl bg-slate-100 h-28"
                                        ></div>
                                    ))}
                                </div>
                            ) : inviteList.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-teal-500 mb-4">
                                        <FaUsers size={28} />
                                    </div>
                                    <p className="text-lg font-semibold text-slate-700">No invites found</p>
                                    <p className="text-sm text-slate-500 max-w-md mx-auto">
                                        You&apos;ll see group invitations from your friends and teammates right here.
                                    </p>
                                </div>
                            ) : (
                                inviteList.map((invite) => {
                                    const isPending = invite.status === "pending";
                                    return (
                                        <div
                                            key={invite._id}
                                            className="rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-white to-slate-50"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                <div>
                                                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                                                        {formatDate(invite.createdAt)}
                                                    </p>
                                                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                                        <FaUsers className="text-teal-500" />
                                                        {invite.group?.name || "Group"}
                                                    </h3>
                                                    <p className="text-sm text-slate-600 mt-1">
                                                        {invite.group?.description || "No description provided"}
                                                    </p>
                                                    <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                                                        <FaUserShield className="text-teal-500" />
                                                        Invited by {invite.inviter?.name || "Someone"}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <span
                                                        className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                                            invite.status === "pending"
                                                                ? "bg-amber-100 text-amber-700"
                                                                : invite.status === "accepted"
                                                                    ? "bg-emerald-100 text-emerald-600"
                                                                    : "bg-rose-100 text-rose-600"
                                                        }`}
                                                    >
                                                        {invite.status}
                                                    </span>
                                                    <p className="text-xs text-slate-500">
                                                        {invite.respondedAt && `Updated ${formatDate(invite.respondedAt)}`}
                                                    </p>
                                                </div>
                                            </div>

                                            {isPending && (
                                                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                                                    <button
                                                        onClick={() => handleRespond(invite, "accept")}
                                                        disabled={actionLoading === `${invite._id}-accept`}
                                                        className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg transition-all ${
                                                            actionLoading === `${invite._id}-accept` ? "opacity-70" : ""
                                                        }`}
                                                    >
                                                        <MdCheckCircle size={18} />
                                                        {actionLoading === `${invite._id}-accept` ? "Accepting..." : "Accept Invite"}
                                                    </button>
                                                    <button
                                                        onClick={() => handleRespond(invite, "decline")}
                                                        disabled={actionLoading === `${invite._id}-decline`}
                                                        className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold border-2 border-rose-200 text-rose-600 bg-white hover:bg-rose-50 transition-all ${
                                                            actionLoading === `${invite._id}-decline` ? "opacity-70" : ""
                                                        }`}
                                                    >
                                                        <MdCancel size={18} />
                                                        {actionLoading === `${invite._id}-decline` ? "Declining..." : "Decline"}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
