import React, { useMemo, useState } from "react";
import { FaUserPlus, FaEnvelopeOpenText, FaPhoneAlt, FaUsers } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const emptyMember = { name: "", email: "", phone: "", role: "Member" };

const AddMembersModal = ({ open, onClose, onSave, existingMembers = [] }) => {
	const [member, setMember] = useState(emptyMember);
	const [pending, setPending] = useState([]);
	const [error, setError] = useState("");

	const totalAfterSave = useMemo(
		() => existingMembers.length + pending.length,
		[existingMembers.length, pending.length]
	);

	if (!open) return null;

	const handleFieldChange = (e) => {
		const { name, value } = e.target;
		setMember((prev) => ({ ...prev, [name]: value }));
		setError("");
	};

	const handleAddToList = (e) => {
		e?.preventDefault();
		if (!member.name.trim() || !member.email.trim()) {
			setError("Name and email are required");
			return;
		}

		setPending((prev) => [...prev, member]);
		setMember(emptyMember);
	};

	const handleRemovePending = (index) => {
		setPending((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const hasDraft = member.name.trim() || member.email.trim() || member.phone.trim();
		let listToSave = pending;

		if (hasDraft) {
			const isValid = member.name.trim() && member.email.trim();
			if (!isValid) {
				setError("Please complete Name and Email before saving");
				return;
			}
			listToSave = [...pending, member];
		}

		if (listToSave.length === 0) {
			setError("Add at least one member");
			return;
		}

		onSave?.(listToSave);
		setPending([]);
		setMember(emptyMember);
		onClose?.();
	};

	return (
		<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
			<div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">
				<div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white p-6 flex items-start justify-between">
					<div className="space-y-1">
						<div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm font-semibold">
							<FaUsers /> Team Builder
						</div>
						<h3 className="text-3xl font-bold flex items-center gap-2">
							<FaUserPlus className="text-white" /> Add Members
						</h3>
						<p className="text-sm text-white/80">
							Invite collaborators with names, emails, and phone numbers.
						</p>
					</div>
					<button
						onClick={onClose}
						className="p-2 rounded-full hover:bg-white/15 transition-colors"
						aria-label="Close"
					>
						<IoMdClose className="text-2xl" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
								<FaUserPlus className="text-emerald-500" /> Full Name
							</label>
							<input
								type="text"
								name="name"
								value={member.name}
								onChange={handleFieldChange}
								placeholder="e.g., Priya Sharma"
								className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
							/>
						</div>
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
								<FaEnvelopeOpenText className="text-blue-500" /> Email
							</label>
							<input
								type="email"
								name="email"
								value={member.email}
								onChange={handleFieldChange}
								placeholder="name@email.com"
								className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
							/>
						</div>
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
								<FaPhoneAlt className="text-orange-500" /> Phone
							</label>
							<input
								type="tel"
								name="phone"
								value={member.phone}
								onChange={handleFieldChange}
								placeholder="Optional"
								className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
							<select
								name="role"
								value={member.role}
								onChange={handleFieldChange}
								className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
							>
								<option value="Member">Member</option>
								<option value="Admin">Admin</option>
								<option value="Viewer">Viewer</option>
							</select>
						</div>
						<div className="md:col-span-2 flex items-end gap-3">
							<button
								type="button"
								onClick={handleAddToList}
								className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-700 transition-all"
							>
								Add to list
							</button>
							<span className="text-sm text-gray-500">
								{pending.length} pending
							</span>
						</div>
					</div>

					{pending.length > 0 && (
						<div className="border border-gray-100 rounded-xl bg-gray-50 p-4 space-y-3">
							<div className="flex items-center justify-between">
								<p className="font-semibold text-gray-800">Pending invites</p>
								<span className="text-xs text-gray-500">
									Will become {totalAfterSave} total members
								</span>
							</div>
							<div className="space-y-2 max-h-48 overflow-y-auto pr-2">
								{pending.map((item, idx) => (
									<div
										key={`${item.email}-${idx}`}
										className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm"
									>
										<div className="flex flex-col text-sm">
											<span className="font-semibold text-gray-800">{item.name}</span>
											<span className="text-gray-600">{item.email}</span>
											{item.phone && (
												<span className="text-gray-500">{item.phone}</span>
											)}
										</div>
										<div className="flex items-center gap-3 text-xs text-gray-600">
											<span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full font-semibold">
												{item.role}
											</span>
											<button
												type="button"
												onClick={() => handleRemovePending(idx)}
												className="text-red-500 hover:text-red-600 font-semibold"
											>
												Remove
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{error && (
						<div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
							{error}
						</div>
					)}

					<div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
						<div className="text-sm text-gray-600">
							<span className="font-semibold text-gray-800">{existingMembers.length}</span> current members •
							<span className="font-semibold text-gray-800"> {pending.length}</span> to invite
						</div>
						<div className="flex gap-3 w-full md:w-auto">
							<button
								type="button"
								onClick={onClose}
								className="flex-1 md:flex-none px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-700 transition-all"
							>
								Send Invites
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddMembersModal;
