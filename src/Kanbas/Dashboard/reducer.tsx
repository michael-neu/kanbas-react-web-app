import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

const initialState = {
    enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        addEnrollment: (state, { payload }) => {
            const { courseId, userId } = payload;
            const newEnrollment = {
                "_id": courseId,
                "user": userId,
                "course": courseId
            };

            state.enrollments = [...state.enrollments, newEnrollment]
        },
        removeEnrollment: (state, { payload }) => {
            const { courseId, userId } = payload;

            state.enrollments = state.enrollments.filter(
                (e: any) => !(e.course === courseId && e.user === userId)
            );
        },
        setEnrollments: (state, action) => {
            state.enrollments = action.payload;
        },
    },
});

export const { addEnrollment, removeEnrollment, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
