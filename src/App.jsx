import {useSelector, useDispatch} from "react-redux";
import {FaPlus, FaTimes, FaSearch} from "react-icons/fa";
import AddWidgetModal from "./components/AddWidgetModal";
import WidgetContent from "./components/WidgetContent";
import {
  setShowAddWidgetModal,
  setSelectedCategory,
  setErrors,
  setNewWidget,
  addWidget,
  removeWidget,
  startEditingWidget,
  resetWidgetForm,
} from "./redux/slices/dashboardSlice";
import {useState} from "react";

function App() {
  const dispatch = useDispatch();
  const {dashboardData, days, showAddWidgetModal} = useSelector(state => state.dashboard);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter widgets based on search term
  const filteredCategories = dashboardData.categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      {/* ===============Header================ */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">CNAPP Dashboard</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              dispatch(setShowAddWidgetModal(true));
              dispatch(setSelectedCategory(null));
            }}
            className="flex items-center gap-1 bg-white text-gray-700 px-3 py-1 rounded border cursor-pointer hover:bg-gray-200 transition-all duration-300"
          >
            <FaPlus size={12} /> Add Widget
          </button>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search widgets..."
                className="bg-white pl-8 pr-3 py-1 rounded border"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
              {searchTerm && (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setSearchTerm("")}
                >
                  <FaTimes size={12} />
                </button>
              )}
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full border border-blue-300 flex items-center gap-1">
              <span className="font-semibold">Last {days} days</span>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-6">
        {filteredCategories.map(category => (
          <div key={category.id} className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">{category.name}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* =================Categories and widgets Section============ */}
              {category.widgets.map(widget => (
                <div
                  key={widget.id}
                  className="bg-white p-4 rounded-lg shadow-sm relative"
                >
                  {/* ============Remove/Edit Widget Button=========== */}
                  <div className="absolute top-2 right-2 flex space-x-2">
                    {widget.userAdded && (
                      <>
                        <button
                          onClick={() =>
                            dispatch(
                              startEditingWidget({categoryId: category.id, widget})
                            )
                          }
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() =>
                            dispatch(
                              removeWidget({categoryId: category.id, widgetId: widget.id})
                            )
                          }
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <FaTimes size={14} />
                        </button>
                      </>
                    )}
                  </div>
                  <h3 className="font-medium text-gray-800 mb-3">{widget.name}</h3>
                  <WidgetContent content={widget.content} />
                </div>
              ))}
              <div
                className="bg-white p-4 rounded-lg shadow-sm border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-all duration-300"
                onClick={() => {
                  dispatch(setShowAddWidgetModal(true));
                  dispatch(setSelectedCategory(category.id));
                }}
              >
                <div className="text-center">
                  <FaPlus className="mx-auto text-gray-400 mb-2" />
                  <span className="text-gray-500">Add Widget</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ============Add/Edit Widget Modal============= */}
      {showAddWidgetModal && <AddWidgetModal />}
    </div>
  );
}

export default App;
