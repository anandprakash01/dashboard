import React, {useEffect} from "react";
import {FaTimes} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import {
  setLastModifiedTime,
  setSelectedCategory,
  setNewWidget,
  addWidget,
  resetWidgetForm,
  setErrors,
} from "../redux/slices/dashboardSlice";

const AddWidgetModal = () => {
  const dispatch = useDispatch();
  const {
    dashboardData,

    selectedCategory,
    newWidget,
    isEditing,
    errors,
  } = useSelector(state => state.dashboard);

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-blue-50 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {isEditing ? "Edit Widget" : "Add New Widget"}
          </h3>

          {/* ==========close button=========== */}
          <button
            onClick={() => dispatch(resetWidgetForm())}
            className="cursor-pointer text-gray-500 hover:text-gray-700 text-xl"
          >
            <FaTimes />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Category
            </label>
            <select
              className={`w-full bg-white border border-gray-300 rounded-md p-2 ${
                errors.category ? "border-red-500" : ""
              }`}
              value={selectedCategory || ""}
              onChange={e => {
                dispatch(setSelectedCategory(e.target.value));
                if (e.target.value) {
                  dispatch(setErrors({...errors, category: ""}));
                }
              }}
            >
              <option value="">Select a category</option>
              {dashboardData.categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Widget Name
            </label>
            <input
              type="text"
              className={`w-full bg-white border border-gray-300 rounded-md p-2 ${
                errors.name ? "border-red-500" : ""
              }`}
              value={newWidget.name}
              onChange={e => {
                dispatch(setNewWidget({...newWidget, name: e.target.value}));
                if (e.target.value) {
                  dispatch(setErrors({...errors, name: ""}));
                }
              }}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Widget Content
            </label>
            <textarea
              className="w-full bg-white border border-gray-300 rounded-md p-2"
              value={newWidget.content.text}
              onChange={e =>
                dispatch(
                  setNewWidget({
                    ...newWidget,
                    content: {...newWidget.content, text: e.target.value},
                  })
                )
              }
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-300 border-gray-400 rounded-md cursor-pointer hover:bg-gray-400 transition-all duration-300"
              onClick={() => dispatch(resetWidgetForm())}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700 transition-all duration-300"
              onClick={() => {
                dispatch(addWidget());
                dispatch(setLastModifiedTime(Date.now()));
                // dispatch(setLastModifiedTime(new Date()));
              }}
            >
              {isEditing ? "Update Widget" : "Add Widget"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;
