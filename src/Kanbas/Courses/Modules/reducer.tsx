import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modules: [{}],
};

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        addModule: (state, { payload: module }) => {
            const newModule: any = {
                _id: new Date().getTime().toString(),
                lessons: [],
                name: module.name,
                course: module.course,
            };
            state.modules = [...state.modules, newModule];
        },
        deleteModule: (state, { payload: moduleId }) => {
            state.modules = state.modules.filter(
                (m: any) => m._id !== moduleId
            );
        },
        updateModule: (state, { payload: module }) => {
            state.modules = state.modules.map((m: any) =>
                m._id === module._id ? module : m
            );
        },
        editModule: (state, { payload: moduleId }) => {
            state.modules = state.modules.map((m: any) =>
                m._id === moduleId ? { ...m, editing: true } : m
            );
        },
        setModules: (state, action) => {
            state.modules = action.payload;
        },
    },
});

export const { addModule, deleteModule, updateModule, editModule, setModules } = modulesSlice.actions;
export default modulesSlice.reducer;
