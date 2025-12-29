import React, { useMemo, useState } from "react";
import { FaUserPlus, FaEnvelopeOpenText, FaPhoneAlt, FaUsers } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const emptyMember = { phone:""};

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
		if (!member.phone.trim()) {
			setError("Phone is required");
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
		const hasDraft = member.phone.trim();
		let listToSave = pending;

		if (hasDraft) {
			const isValid = member.phone.trim();
			if (!isValid) {
				setError("Please complete Phone before saving");
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
				<div className="bg-gradient-to-r from-teal-400  to-teal-600 text-white p-6 flex items-start justify-between">
					<div className="space-y-1">
						<div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm font-semibold">
							<FaUsers /> Team Builder
						</div>
						<h3 className="text-3xl font-bold flex items-center gap-2">
							<FaUserPlus className="text-white" /> Add Members
						</h3>
						
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
					<div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
								<FaUserPlus className="text-teal-500" /> Phone
							</label>
							<input
								type="text"
								name="phone"
								value={member.phone}
								onChange={handleFieldChange}
								placeholder="e.g., +1234567890"
								className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-teal-500 focus:border-transparent outline-none"
							/>

						</div>

						<div>
							<button
								type="button"
								onClick={handleAddToList}
								className=" px-4 py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-teal-500 hover:to-teal-700 transition-all w-full mt-7"
							>
								Add to list
							</button>
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
											{item.phone && (
												<span className="text-gray-500">{item.phone}</span>
											)}
										</div>
										<div className="flex items-center gap-3 text-xs text-gray-600">
											
											<button
												type="button"
												onClick={() => handleRemovePending(idx)}
												className="text-red-500 hover:text-red-600 font-semibold transition-colors cursor-pointer px-3 py-1 rounded-lg border border-red-200 hover:bg-red-50"
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
						<div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm ">
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
								className="flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-teal-700 transition-all"
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
