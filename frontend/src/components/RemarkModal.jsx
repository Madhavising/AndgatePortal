import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const RemarkModal = ({ isOpen, onClose, onSave, initialRemark }) => {
  const [remark, setRemark] = useState(initialRemark || "");

  useEffect(() => {
    if (isOpen) setRemark(initialRemark || "");
  }, [isOpen, initialRemark]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Remark</h2>
        <textarea
          rows={4}
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Type your remark here..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        ></textarea>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => onSave(remark)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemarkModal;
