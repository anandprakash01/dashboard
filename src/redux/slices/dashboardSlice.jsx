import {createSlice} from "@reduxjs/toolkit";
import dashboardDataJson from "../../data/dashboard.json";

const initialState = {
  dashboardData: dashboardDataJson,
  days: 7,
  showAddWidgetModal: false,
  selectedCategory: null,
  newWidget: {
    name: "",
    content: {type: "text", text: ""},
  },
  isEditing: false,
  editingWidgetId: null,
  errors: {category: "", name: ""},
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload;
    },
    setDays: (state, action) => {
      state.days = action.payload;
    },
    setShowAddWidgetModal: (state, action) => {
      state.showAddWidgetModal = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setNewWidget: (state, action) => {
      state.newWidget = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setEditingWidgetId: (state, action) => {
      state.editingWidgetId = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    addWidget: state => {
      const newErrors = {category: "", name: ""};

      if (!state.selectedCategory) {
        newErrors.category = "Please select a category";
      }

      if (!state.newWidget.name) {
        newErrors.name = "Widget name is required!";
      }

      state.errors = newErrors;

      if (!state.selectedCategory || !state.newWidget.name) {
        return;
      }

      const categoryIndex = state.dashboardData.categories.findIndex(
        cat => cat.id === state.selectedCategory
      );

      if (categoryIndex !== -1) {
        if (state.isEditing && state.editingWidgetId) {
          // Update existing widget
          let oldCategoryIndex = -1;
          let widgetIndex = -1;

          // Search for the widget in all categories
          state.dashboardData.categories.forEach((category, catIndex) => {
            const index = category.widgets.findIndex(
              widget => widget.id === state.editingWidgetId
            );
            if (index !== -1) {
              oldCategoryIndex = catIndex;
              widgetIndex = index;
            }
          });

          if (oldCategoryIndex !== -1 && widgetIndex !== -1) {
            // Check if the widget is being moved to a different category
            if (categoryIndex !== oldCategoryIndex) {
              // Get the widget data
              const widgetToMove = {
                ...state.dashboardData.categories[oldCategoryIndex].widgets[widgetIndex],
              };

              // Update widget properties
              widgetToMove.name = state.newWidget.name;
              widgetToMove.content = state.newWidget.content;

              // Remove from old category
              state.dashboardData.categories[oldCategoryIndex].widgets.splice(
                widgetIndex,
                1
              );

              // Add to new category
              state.dashboardData.categories[categoryIndex].widgets.push(widgetToMove);
            } else {
              state.dashboardData.categories[categoryIndex].widgets[widgetIndex] = {
                ...state.dashboardData.categories[categoryIndex].widgets[widgetIndex],
                name: state.newWidget.name,
                content: state.newWidget.content,
              };
            }
          }
        } else {
          // Add new widget
          state.dashboardData.categories[categoryIndex].widgets.push({
            id: `widget-${Date.now()}`,
            name: state.newWidget.name,
            content: state.newWidget.content,
            userAdded: true, // Mark as user-added
          });
        }

        state.newWidget = {name: "", content: {type: "text", text: ""}};
        state.showAddWidgetModal = false;
        state.isEditing = false;
        state.editingWidgetId = null;
      }
    },
    removeWidget: (state, action) => {
      const {categoryId, widgetId} = action.payload;
      const categoryIndex = state.dashboardData.categories.findIndex(
        cat => cat.id === categoryId
      );

      if (categoryIndex !== -1) {
        state.dashboardData.categories[categoryIndex].widgets =
          state.dashboardData.categories[categoryIndex].widgets.filter(
            widget => widget.id !== widgetId
          );
      }
    },
    startEditingWidget: (state, action) => {
      const {categoryId, widget} = action.payload;
      state.selectedCategory = categoryId;
      state.newWidget = {
        name: widget.name,
        content: widget.content,
      };
      state.isEditing = true;
      state.editingWidgetId = widget.id;
      state.showAddWidgetModal = true;
    },
    resetWidgetForm: state => {
      state.showAddWidgetModal = false;
      state.isEditing = false;
      state.editingWidgetId = null;
      state.newWidget = {name: "", content: {type: "text", text: ""}};
      state.errors = {category: "", name: ""};
    },
  },
});

export const {
  setDashboardData,
  setDays,
  setShowAddWidgetModal,
  setSelectedCategory,
  setNewWidget,
  setIsEditing,
  setEditingWidgetId,
  setErrors,
  addWidget,
  removeWidget,
  startEditingWidget,
  resetWidgetForm,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
