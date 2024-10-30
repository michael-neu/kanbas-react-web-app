import { assignments } from "../../Database";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    assignments: assignments,
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (a: any) => a._id !== assignmentId
            );
        },
        upsertAssignment: (state, { payload: assignment }) => {
            const index = state.assignments.findIndex((a: any) => a._id === assignment._id)

            if (index !== -1) {
                state.assignments[index] = assignment;
            } else {
                state.assignments.push(assignment);
            }
        },
    },
});

export const { deleteAssignment, upsertAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
