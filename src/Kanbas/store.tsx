import { configureStore } from "@reduxjs/toolkit";
import assignmentsReducer from "./Courses/Assignments/reducer";
import accountReducer from "./Account/reducer";
import enrollmentsReducer from "./Dashboard/reducer";
import modulesReducer from "./Courses/Modules/reducer";

const store = configureStore({
    reducer: {
        assignmentsReducer,
        accountReducer,
        enrollmentsReducer,
        modulesReducer,
    },
});

export default store;
